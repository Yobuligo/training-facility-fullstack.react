import { UserContactOptions } from "../model/UserContactOptions";
import { IUserContactOptions } from "../shared/model/IUserContactOptions";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserContactOptionsRepo extends SequelizeRepository<IUserContactOptions> {
  constructor() {
    super(UserContactOptions);
  }
}
