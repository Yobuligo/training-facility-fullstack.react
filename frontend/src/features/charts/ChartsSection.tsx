import { CardList } from "../../components/cardList/CardList";
import { CollapseCard } from "../../components/collapseCard/CollapseCard";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ActiveMemberChart } from "./activeMemberChart/ActiveMemberChart";
import styles from "./ChartsSection.module.scss";
import { ActiveMemberByTariffChart } from "./activeMemberByTariffChart/ActiveMemberByTariffChart";

const ChartsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CardList>
      <CollapseCard
        className={styles.collapsibleCard}
        title={t(texts.stats.activeMembers)}
      >
        <ActiveMemberChart />
      </CollapseCard>
      <CollapseCard
        className={styles.collapsibleCard}
        title={t(texts.stats.activeMembersByTariff)}
      >
        <ActiveMemberByTariffChart />
      </CollapseCard>
    </CardList>
  );
};

export default ChartsSection;
