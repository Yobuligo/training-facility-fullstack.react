import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../core/types/Value";
import { IUserProfile } from "../shared/model/IUserProfile";

/**
 * This hook provides access to the user profile of the current logged in user.
 */
export const useUserProfile = (): Value<IUserProfile | undefined> => {
  const context = useContext(AppContext);
  return context.userProfile;
};
