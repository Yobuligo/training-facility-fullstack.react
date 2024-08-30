import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../core/types/Value";
import { IUser } from "../shared/model/IUser";

/**
 * This hook provides access to the user instance of the current logged in user.
 */
export const useUser = (): Value<IUser | undefined> => {
  const context = useContext(AppContext);
  return context.user;
};
