import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IEntityWithUserProfileId } from "../model/types/IEntityWithUserProfileId";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserContactOptions } from "../model/UserContactOptions";
import { UserGrading } from "../model/UserGrading";
import { UserGuardian } from "../model/UserGuardian";
import { UserProfile } from "../model/UserProfile";
import { UserProfileImage } from "../model/UserProfileImage";
import { IUserGrading } from "../shared/model/IUserGrading";
import { IUserGuardian } from "../shared/model/IUserGuardian";
import { IUserProfile } from "../shared/model/IUserProfile";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTransaction } from "./sequelize/utils/findTransaction";
import { transaction } from "./sequelize/utils/transaction";
import { UserGradingRepo } from "./UserGradingRepo";
import { UserGuardianRepo } from "./UserGuardianRepo";

export class UserProfileRepo extends SequelizeRepository<IUserProfile> {
  constructor() {
    super(UserProfile, [
      { model: UserBankAccount, as: "userBankAccount" },
      { model: UserContactOptions, as: "userContactOptions" },
      { model: UserGrading, as: "userGradings" },
      { model: UserGuardian, as: "userGuardians" },
      { model: UserProfileImage, as: "userProfileImages" },
    ]);
  }

  findByUserId<K extends keyof IUserProfile>(
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfile, K> | undefined>;
  findByUserId(userId: string): Promise<IUserProfile | undefined>;
  async findByUserId(userId: string, fields?: unknown): Promise<unknown> {
    const attributes = this.getAttributes(fields);
    const includes = this.getIncludes(fields);
    const data = await this.model.findOne({
      where: { userId },
      attributes: attributes,
      include: includes,
      transaction: findTransaction(),
    });
    return data?.toJSON();
  }

  insert<K extends keyof IUserProfile>(
    entity: IEntityDetails<IUserProfile>,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfile, K>>;
  insert(entity: IEntityDetails<IUserProfile>): Promise<IUserProfile>;
  async insert(
    entity: IEntityDetails<IUserProfile>,
    fields?: unknown
  ): Promise<IUserProfile> {
    if (fields) {
      const userProfile = await super.insert(
        entity,
        fields as (keyof IUserProfile)[]
      );
      this.insertUserProfileRelations(userProfile.id, entity);
      return userProfile;
    } else {
      const userProfile = await super.insert(entity);
      this.insertUserProfileRelations(userProfile.id, entity);
      return userProfile;
    }
  }

  async update(entity: IUserProfile): Promise<boolean> {
    let wasUpdated = false;
    await transaction(async (transaction) => {
      const [updatedRows] = await UserProfile.update(entity, {
        where: { id: entity.id },
        transaction,
      });

      if (entity.userBankAccount) {
        await UserBankAccount.upsert(entity.userBankAccount, { transaction });
      }

      if (entity.userContactOptions) {
        await UserContactOptions.upsert(entity.userContactOptions, {
          transaction,
        });
      }

      await this.synchronizeUserGradings(entity.id, entity.userGradings);
      await this.synchronizeGuardians(entity.id, entity.userGuardians);

      wasUpdated = updatedRows === 1;
    });
    return wasUpdated;
  }

  async updateLastInvitedAtByUserId(
    userId: string,
    lastInvitedAt: Date
  ): Promise<boolean> {
    const userProfile = await this.findByUserId(userId, ["id"]);
    if (!userProfile) {
      return false;
    }

    await this.model.update(
      { lastInvitedAt: lastInvitedAt },
      { where: { id: userProfile.id } }
    );

    return true;
  }

  private async insertUserProfileRelations(
    userProfileId: string,
    entity: IEntityDetails<IUserProfile>
  ) {
    if (entity.userBankAccount) {
      entity.userBankAccount.userProfileId = userProfileId;
      await UserBankAccount.upsert(entity.userBankAccount);
    }

    if (entity.userContactOptions) {
      entity.userContactOptions.userProfileId = userProfileId;
      await UserContactOptions.upsert(entity.userContactOptions);
    }

    if (entity.userGradings) {
      await this.synchronizeUserGradings(userProfileId, entity.userGradings);
    }

    if (entity.userGuardians) {
      await this.synchronizeGuardians(userProfileId, entity.userGuardians);
    }
  }

  private async synchronizeUserGradings(
    userProfileId: string,
    userGradings?: IUserGrading[]
  ) {
    if (userGradings) {
      this.updateUserProfileId(userGradings, userProfileId);
      const userGradingRepo = new UserGradingRepo();
      await userGradingRepo.synchronize(userGradings, { userProfileId });
    }
  }

  private async synchronizeGuardians(
    userProfileId: string,
    userGuardians?: IUserGuardian[]
  ) {
    if (userGuardians) {
      this.updateUserProfileId(userGuardians, userProfileId);
      const userGuardianRepo = new UserGuardianRepo();
      await userGuardianRepo.synchronize(userGuardians, { userProfileId });
    }
  }

  private updateUserProfileId(
    entities: IEntityWithUserProfileId[],
    userProfileId: string
  ) {
    entities.forEach((entity) => (entity.userProfileId = userProfileId));
  }
}
