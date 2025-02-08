import { Value } from "../core/types/Value";
import { IAdminSettings } from "../model/IAdminSettings";
import { useLocalStorage } from "./useLocalStorage";

export const useAdminSettingsStorage = (): Value<IAdminSettings> => {
  const [adminSettings, setAdminSettings] = useLocalStorage<IAdminSettings>(
    "trainings-facility.admin-settings",
    { collapseWhatsAppGroups: false }
  );
  return [adminSettings, setAdminSettings];
};
