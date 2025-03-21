import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserBankAccount } from "../shared/model/IUserBankAccount";
import { createIdType } from "./core/createIdType";
import { UserProfile } from "./UserProfile";

const userBankAccount: ModelStatic<
  Model<IUserBankAccount, IEntityDetails<IUserBankAccount>>
> = db.define("user-bank-accounts", {
  id: createIdType(),
  bankAccountBIC: {
    allowNull: true,
    type: DataTypes.STRING(11),
  },
  bankAccountIBAN: {
    allowNull: true,
    type: DataTypes.STRING(34),
  },
  bankAccountOwner: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  mandateDate: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  mandateReference: {
    allowNull: true,
    type: DataTypes.STRING(35),
  },
});

export const relHasOneUserBankAccount = "userBankAccount";

export class UserBankAccount extends userBankAccount {
  static associate() {
    UserBankAccount.belongsTo(UserProfile, { onDelete: "CASCADE" });
    UserProfile.hasOne(UserBankAccount, {
      as: relHasOneUserBankAccount,
      foreignKey: {
        allowNull: false,
        name: "userProfileId",
      },
    });
  }
}
