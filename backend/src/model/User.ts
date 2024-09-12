import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { createIdType } from "./core/createIdType";
import { SequelizeModel } from "./core/SequelizeModel";
import { IUserSecure } from "./types/IUserSecure";

const user: ModelStatic<Model<IUserSecure, IEntityDetails<IUserSecure>>> =
  db.define(
    "users",
    {
      id: createIdType(),
      username: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      salt: DataTypes.STRING(100),
      isDeactivated: DataTypes.BOOLEAN,
      deactivatedAt: DataTypes.DATE,
    },
    {
      defaultScope: {
        // exclude password and salt from default scope to not load them normally when selecting users
        attributes: { exclude: ["password", "salt"] },
      },
    }
  );

export class User extends SequelizeModel(user, () => {}) {}
