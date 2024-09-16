import { hash } from "./hash";

export const hashPassword = (password: string): string => {
  return hash(password);
};
