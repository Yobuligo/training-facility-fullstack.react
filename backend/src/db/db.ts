import { Sequelize } from "sequelize";
import { AppConfig } from "../AppConfig";

export const db = new Sequelize({
  dialect: "mariadb",
  host: AppConfig.dbHost,
  port: AppConfig.dbPort,
  database: AppConfig.dbName,
  username: AppConfig.dbUsername,
  password: AppConfig.dbPassword,
});
