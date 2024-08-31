import { UserBankAccount } from "../model/UserBankAccount";
import { IUserBankAccount } from "../shared/model/IUserBankAccount";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserBankAccountRepo extends SequelizeRepository<IUserBankAccount> {
  constructor() {
    super(UserBankAccount);
  }
}
