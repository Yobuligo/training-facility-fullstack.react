import * as dotenv from "dotenv";
import * as path from "path";
import { checkNotNull } from "./core/utils/checkNotNull";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const AppConfig = {
  clientHost: process.env.CLIENT_HOST,
  clientAppUrl: process.env.CLIENT_APP_URL,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT!),
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  smtpHost: process.env.EMAIL_SMTP_HOST,
  smtpPort: process.env.EMAIL_SMTP_PORT,
  smtpUsername: process.env.EMAIL_SMTP_USERNAME,
  smtpPassword: process.env.EMAIL_SMTP_PASSWORD,
  smtpSender: process.env.EMAIL_SMTP_SENDER,
  userNumberAttemptsToTemporaryBlock: parseInt(
    checkNotNull(process.env.USER_NUMBER_ATTEMPTS_TO_TEMPORARY_BLOCK)
  ),
  userNumberAttemptsToPermanentlyLock: parseInt(
    checkNotNull(process.env.USER_NUMBER_ATTEMPTS_TO_PERMANENTLY_LOCK)
  ),
  userTemporaryBlockInMinutes: parseInt(
    checkNotNull(process.env.USER_TEMPORARY_BLOCK_IN_MINUTES)
  ),
  serverPepper: process.env.SERVER_PEPPER,
  serverSessionSecret: process.env.SERVER_SESSION_SECRET,
};
