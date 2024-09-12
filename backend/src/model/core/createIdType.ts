import { DataTypes } from "sequelize";

export const createIdType = () => {
  return {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  };
};
