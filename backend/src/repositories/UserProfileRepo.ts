import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { db } from "../db/db";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { IUserProfile } from "../shared/model/IUserProfile";
import { AuthRole } from "../shared/types/AuthRole";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { UserRepo } from "./UserRepo";
import { UserRoleRepo } from "./UserRoleRepo";

export class UserProfileRepo extends SequelizeRepository<IUserProfile> {
  constructor() {
    super(UserProfile, [
      { model: UserBankAccount, as: "userBankAccount" },
      { model: UserGrading, as: "userGradings" },
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
  ): Promise<unknown> {
    const transaction = await db.transaction();
    try {
      // create user
      const userRepo = new UserRepo();
      const user = await userRepo.createUser({
        username: entity.email,
        password: "initial",
      });

      // create profile
      const userProfileRepo = new UserProfileRepo();
      entity.userId = user.id;
      const userProfile = await userProfileRepo.insert(entity);

      // create user roles
      const userRoleRepo = new UserRoleRepo();
      await userRoleRepo.insert({ role: AuthRole.USER, userId: user.id });
      return userProfile;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async update(entity: IUserProfile): Promise<boolean> {
    const transaction = await db.transaction();
    try {
      const [updatedRows] = await UserProfile.update(entity, {
        where: { id: entity.id },
        transaction,
      });

      if (entity.userBankAccount) {
        await UserBankAccount.upsert(entity.userBankAccount, { transaction });
      }
      transaction.commit();
      return updatedRows === 1;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
}
