import { useContext } from "react";
import { AppContext } from "../context/AppContext";

/**
 * This hook is responsible for providing access to the profile details settings,
 * which are used to persist, load and set the state of the collapsibles in the user profile.
 */
export const useProfileDetailsSettings = () => {
  const context = useContext(AppContext);
  return context.profileDetailsSettings;
};
