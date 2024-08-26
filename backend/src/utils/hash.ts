import hashing from "hash.js";

/**
 * Hashes the given *{@link value}* by sha256.
 */
export const hash = (value: string): string => {
  return hashing.sha256().update(value).digest("hex");
};
