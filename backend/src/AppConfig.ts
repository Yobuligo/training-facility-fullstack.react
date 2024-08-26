import * as dotenv from "dotenv";
import * as path from "path";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const AppConfig = {
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT!),
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  PEPPER: process.env.DB_PEPPER,
};
