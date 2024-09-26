import { error } from "./core/utils/error";

export const AppConfig = {
  HOST:
    process.env.REACT_APP_BACKEND_HOST ??
    error(`Error while getting host information from environment variables`),
  sharedKey:
    process.env.REACT_APP_SHARED_KEY ??
    error(
      `Error while getting shared key information from environment variables`
    ),
};
