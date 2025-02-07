import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { ISystemConfig } from "../shared/model/ISystemConfig";
import { createIdType } from "./core/createIdType";

const systemConfig: ModelStatic<
  Model<ISystemConfig, IEntityDetails<ISystemConfig>>
> = db.define("system-configs", {
  id: createIdType(),
  whatsAppURLCommunity: DataTypes.STRING(255),
  whatsAppURLKids: DataTypes.STRING(255),
  whatsAppURLNews: DataTypes.STRING(255),
});

export class SystemConfig extends systemConfig {
  static associate() {
    // Has currently no associations
  }
}
