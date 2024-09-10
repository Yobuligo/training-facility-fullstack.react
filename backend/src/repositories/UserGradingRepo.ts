import { UserGrading } from "../model/UserGrading";
import { IUserGrading } from "../shared/model/IUserGrading";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserGradingRepo extends SequelizeRepository<IUserGrading> {
  constructor() {
    super(UserGrading);
  }
}
