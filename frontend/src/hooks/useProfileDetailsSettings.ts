import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const useProfileDetailsSettings = () => {
  const context = useContext(AppContext);
  return context.profileDetailsSettings;
};
