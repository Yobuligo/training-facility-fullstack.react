import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useProfileDetailsSettingsStorage =
  (): Value<IProfileDetailsSettings> => {
    const [profileDetailsSettings, setProfileDetailsSettings] =
      useLocalStorage<IProfileDetailsSettings>("training-facility", {
        collapseTechnicalInformation: false,
        collapseAddress: false,
        collapseBank: false,
        collapsePersonalInformation: false,
      });

    return [profileDetailsSettings, setProfileDetailsSettings];
  };
