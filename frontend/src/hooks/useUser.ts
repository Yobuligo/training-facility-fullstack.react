import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../core/types/Value";
import { IUserInternal } from "../model/IUserInternal";

/**
 * This hook provides access to the user instance of the current logged in user.
 */
export const useUser = (): Value<IUserInternal | undefined> => {
  const context = useContext(AppContext);
  return context.user;
};
