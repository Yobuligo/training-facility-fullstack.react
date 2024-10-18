import { error } from "./core/utils/error";

export const AppConfig = {
  build: {
    version: "1.6.0",
    date: "20241018",
    number: 7,
  },
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
  version: "1.1.0",
};
