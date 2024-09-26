import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { UserTrialTraining } from "../model/UserTrialTraining";
import { UserTrialTrainingExistsError } from "../shared/errors/UserTrialTrainingExistsError";
import { IUserTrialTraining } from "../shared/model/IUserTrialTraining";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserTrialTrainingRepo extends SequelizeRepository<IUserTrialTraining> {
  constructor() {
    super(UserTrialTraining);
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
