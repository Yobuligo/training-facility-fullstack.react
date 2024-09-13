import nodemailer from "nodemailer";
import { AppConfig } from "../AppConfig";
import { checkNotNull } from "../core/utils/checkNotNull";

export const smtp = nodemailer.createTransport({
  host: checkNotNull(AppConfig.smtpHost),
  port: parseInt(checkNotNull(AppConfig.smtpPort)),
  secure: true,
  auth: {
    user: checkNotNull(AppConfig.smtpUsername),
    pass: checkNotNull(AppConfig.smtpPassword),
  },
});
