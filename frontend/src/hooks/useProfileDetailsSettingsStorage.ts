import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { Value } from "../core/types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useProfileDetailsSettingsStorage =
  (): Value<IProfileDetailsSettings> => {
    const [profileDetailsSettings, setProfileDetailsSettings] =
      useLocalStorage<IProfileDetailsSettings>("training-facility", {
        collapseAddress: false,
        collapseBank: false,
        collapseGradings: false,
        collapsePersonalInformation: false,
        collapseTechnicalInformation: false,
      });

    return [profileDetailsSettings, setProfileDetailsSettings];
  };
