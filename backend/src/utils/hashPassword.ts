import { AppConfig } from "../AppConfig";
import { hash } from "./hash";

/**
 * Hashes the given *{@link password}* by using the given *{@link salt}* and a pepper.
 */
export const hashPassword = (password: string, salt: string): string => {
  return hash(`${password}-${salt}-${AppConfig.PEPPER}`);
};
