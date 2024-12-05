import { UserGuardian } from "../model/UserGuardian";
import { IUserGuardian } from "../shared/model/IUserGuardian";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserGuardianRepo extends SequelizeRepository<IUserGuardian> {
  constructor() {
    super(UserGuardian);
  }
}
