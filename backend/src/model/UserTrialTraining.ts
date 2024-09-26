import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserTrialTraining } from "../shared/model/IUserTrialTraining";
import { createIdType } from "./core/createIdType";
import { EventInstance } from "./EventInstance";

const userTrialTraining: ModelStatic<
  Model<IUserTrialTraining, IEntityDetails<IUserTrialTraining>>
> = db.define("user-trial-trainings", {
  id: createIdType(),
  firstname: DataTypes.STRING(50),
  lastname: DataTypes.STRING(50),
  email: DataTypes.STRING(255),
  state: DataTypes.INTEGER,
});

export class UserTrialTraining extends userTrialTraining {
  static associate() {
    UserTrialTraining.belongsTo(EventInstance, { onDelete: "CASCADE" });
    EventInstance.hasMany(UserTrialTraining, {
      as: "userTrialTrainings",
      foreignKey: "eventInstanceId",
    });
  }
}
