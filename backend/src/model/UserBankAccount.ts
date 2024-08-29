import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserBankAccount } from "../shared/model/IUserBankAccount";
import { User } from "./User";

const userBankAccount: ModelStatic<
  Model<IUserBankAccount, IEntityDetails<IUserBankAccount>>
> = db.define("user-bank-accounts", {
  bankAccountBIC: {
    allowNull: true,
    type: DataTypes.STRING(11),
  },
  bankAccountIBAN: {
    allowNull: true,
    type: DataTypes.STRING(34),
  },
  bankAccountInstitution: {
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  bankAccountOwner: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
});

export class UserBankAccount extends userBankAccount {}

UserBankAccount.belongsTo(User);
User.hasOne(UserBankAccount);
