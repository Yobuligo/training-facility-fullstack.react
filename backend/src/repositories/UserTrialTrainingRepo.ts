import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { EventInstance } from "../model/EventInstance";
import { UserTrialTraining } from "../model/UserTrialTraining";
import { UserTrialTrainingExistsError } from "../shared/errors/UserTrialTrainingExistsError";
import { IUserTrialTraining } from "../shared/model/IUserTrialTraining";
import { IUserTrialTrainingDetails } from "../shared/model/IUserTrialTrainingDetails";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserTrialTrainingRepo extends SequelizeRepository<IUserTrialTraining> {
  constructor() {
    super(UserTrialTraining);
  }

  async findDetailsById(
    id: string
  ): Promise<IUserTrialTrainingDetails | undefined> {
    const data = await UserTrialTraining.findByPk(id);
    if (data) {
      const userTrialTraining = data.toJSON() as IUserTrialTrainingDetails;
      const eventInstanceData = await EventInstance.findByPk(
        userTrialTraining.eventInstanceId
      );
      if (!eventInstanceData) {
        return undefined;
      }
      userTrialTraining.eventInstance = eventInstanceData.toJSON();
      return userTrialTraining;
    }
    return undefined;
  }

  insert<K extends keyof IUserTrialTraining>(
    entity: IEntityDetails<IUserTrialTraining>,
    fields: K[]
  ): Promise<IEntitySubset<IUserTrialTraining, K>>;
  insert(
    entity: IEntityDetails<IUserTrialTraining>
  ): Promise<IUserTrialTraining>;
  async insert(
    entity: IEntityDetails<IUserTrialTraining>,
    fields?: unknown
  ): Promise<unknown> {
    // check if an trial training already exists for the given email
    const data = await UserTrialTraining.findOne({
      where: { email: entity.email },
    });
    if (data) {
      throw new UserTrialTrainingExistsError();
    }

    const createdData = await UserTrialTraining.create(entity);
    return this.toJson(createdData, fields);
  }
}
