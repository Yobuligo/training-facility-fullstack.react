import { error } from "./core/utils/error";

export const AppConfig = {
  build: {
    version: "1.14.1",
    date: "20250321",
    number: 20,
  },
  defaultDateTimeSpanFilter: "day", // Sets the default view for the event calendar (supported values day or week).
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
