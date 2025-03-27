import { useChartSettingsStorage } from "./hooks/useChartsSettingsStorage";

export const useChartsSectionViewModel = () => {
  const [chartsSettings, setChartsSettings] = useChartSettingsStorage();

  const onToggleActiveMembers = (collapsed: boolean) => {
    setChartsSettings((previous) => {
      previous.collapseActiveMember = collapsed;
      return { ...previous };
    });
  };

  const onToggleActiveMembersByTariff = (collapsed: boolean) => {
    setChartsSettings((previous) => {
      previous.collapseActiveMemberByTariff = collapsed;
      return { ...previous };
    });
  };

  const onToggleActiveMembersByGender = (collapsed: boolean) => {
    setChartsSettings((previous) => {
      previous.collapseActiveMemberByGender = collapsed;
      return { ...previous };
    });
  };

  const onToggleActiveMembersByGrade = (collapsed: boolean) => {
    setChartsSettings((previous) => {
      previous.collapseActiveMemberByGrade = collapsed;
      return { ...previous };
    });
  };

  return {
    chartsSettings,
    onToggleActiveMembers,
    onToggleActiveMembersByGender,
    onToggleActiveMembersByGrade,
    onToggleActiveMembersByTariff,
  };
};
