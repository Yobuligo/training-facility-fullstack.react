import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserContactOptions } from "../shared/model/IUserContactOptions";
import { createIdType } from "./core/createIdType";

const userContactOption: ModelStatic<
  Model<IUserContactOptions, IEntityDetails<IUserContactOptions>>
> = db.define("user-contact-options", {
  id: createIdType(),
  email: DataTypes.BOOLEAN,
  homepagePhotos: DataTypes.BOOLEAN,
  printPhotos: DataTypes.BOOLEAN,
  socialMediaPhotos: DataTypes.BOOLEAN,
  textMessage: DataTypes.BOOLEAN,
  whatsApp: DataTypes.BOOLEAN,
});

