import { error } from "./core/utils/error";

export const AppConfig = {
  build: {
    version: "1.12.0",
    date: "20241210",
    number: 14,
  },
  defaultDateTimeSpanFilter: "day", // supported values day or week
  HOST:
    process.env.REACT_APP_BACKEND_HOST ??
    error(`Error while getting host information from environment variables`),
  imprint:
    process.env.REACT_APP_IMPRINT_LINK ??
    error(`Error while getting imprint information from environment variables`),
  privacyPolicy:
    process.env.REACT_APP_PRIVACY_POLICY_LINK ??
    error(
      `Error while getting privacy policy information from environment variables`
    ),
};
