import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Value } from "../core/types/Value";
import { IAdminSettings } from "../model/IAdminSettings";

export const useAdminSettings = (): Value<IAdminSettings> => {
  const context = useContext(AppContext);
  return context.adminSettings;
};
