import { IProfileDetailsSettings } from "../model/IProfileDetailSettings";
import { Value } from "../types/Value";
import { useLocalStorage } from "./useLocalStorage";

export const useProfileDetailsSettingsStorage =
  (): Value<IProfileDetailsSettings> => {
    const [profileDetailsSettings, setProfileDetailsSettings] =
      useLocalStorage<IProfileDetailsSettings>("training-facility", {
        displayTechnicalInformation: true,
        displayAddress: true,
        displayBank: true,
        displayPersonalInformation: true,
      });

    return [profileDetailsSettings, setProfileDetailsSettings];
  };
