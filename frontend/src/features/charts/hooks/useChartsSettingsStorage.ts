import { Value } from "../../../core/types/Value";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { IChartsSettings } from "../types/IChartsSettings";

export const useChartSettingsStorage = (): Value<IChartsSettings> => {
  const [chartSettings, setChartSettings] = useLocalStorage<IChartsSettings>(
    "trainings-facility.admin-settings",
    {
      collapseActiveMember: false,
      collapseActiveMemberByGender: true,
      collapseActiveMemberByTariff: true,
    }
  );
  return [chartSettings, setChartSettings];
};
