import { CardList } from "../../components/cardList/CardList";
import { CollapseCard } from "../../components/collapseCard/CollapseCard";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ActiveMemberChart } from "./activeMemberChart/ActiveMemberChart";
import styles from "./ChartsSection.module.scss";
import { TariffMemberChart } from "./tariffMemberChart/TariffMemberChart";

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
        <TariffMemberChart />
      </CollapseCard>
    </CardList>
  );
};

export default ChartsSection;
