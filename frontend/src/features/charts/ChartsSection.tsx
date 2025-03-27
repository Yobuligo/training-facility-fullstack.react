import { CardList } from "../../components/cardList/CardList";
import { CollapseCard } from "../../components/collapseCard/CollapseCard";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ActiveMemberByGenderChart } from "./activeMemberByGenderChart/ActiveMemberByGenderChart";
import { ActiveMemberByGradeChart } from "./activeMemberByGradeChart/ActiveMemberByGradeChart";
import { ActiveMemberByTariffChart } from "./activeMemberByTariffChart/ActiveMemberByTariffChart";
import { ActiveMemberChart } from "./activeMemberChart/ActiveMemberChart";
import styles from "./ChartsSection.module.scss";
import { useChartsSectionViewModel } from "./useChartsSectionViewModel";

/**
 * This component is responsible for displaying the charts section
 */
const ChartsSection: React.FC = () => {
  const viewModel = useChartsSectionViewModel();
  const { t } = useTranslation();

  return (
    <CardList>
      <CollapseCard
        className={styles.collapsibleCard}
        collapsed={viewModel.chartsSettings.collapseActiveMember}
        onToggleCollapse={viewModel.onToggleActiveMembers}
        title={t(texts.stats.activeMembers)}
      >
        <ActiveMemberChart />
      </CollapseCard>
      <CollapseCard
        className={styles.collapsibleCard}
        collapsed={viewModel.chartsSettings.collapseActiveMemberByTariff}
        onToggleCollapse={viewModel.onToggleActiveMembersByTariff}
        title={t(texts.stats.activeMembersByTariff)}
      >
        <ActiveMemberByTariffChart />
      </CollapseCard>
      <CollapseCard
        className={styles.collapsibleCard}
        collapsed={viewModel.chartsSettings.collapseActiveMemberByGender}
        onToggleCollapse={viewModel.onToggleActiveMembersByGender}
        title={t(texts.stats.activeMembersByGender)}
      >
        <ActiveMemberByGenderChart />
      </CollapseCard>
      <CollapseCard
        className={styles.collapsibleCard}
        collapsed={viewModel.chartsSettings.collapseActiveMemberByGrade}
        onToggleCollapse={viewModel.onToggleActiveMembersByGrade}
        title={t(texts.stats.activeMembersByGrade)}
      >
        <ActiveMemberByGradeChart />
      </CollapseCard>
    </CardList>
  );
};

export default ChartsSection;
