import { UserTrialTraining } from "../model/UserTrialTraining";
import { IUserTrialTraining } from "../shared/model/IUserTrialTraining";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserTrialTrainingRepo extends SequelizeRepository<IUserTrialTraining> {
  constructor() {
    super(UserTrialTraining);
  }
}
