import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../core/types/Value";
import { IUserInternal } from "../model/IUserInternal";

/**
 * This hook provides access to the user instance of the current logged in user or returns null if the user is not set.
 */
export const useUserOrNull = (): Value<IUserInternal | undefined> => {
  const context = useContext(AppContext);
  return context.user;
};
