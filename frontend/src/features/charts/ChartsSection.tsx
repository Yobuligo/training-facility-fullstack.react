import { ActiveMemberChart } from "./activeMemberChart/ActiveMemberChart";
import styles from "./ChartsSection.module.scss";
import { TariffMemberChart } from "./tariffMemberChart/TariffMemberChart";

const ChartsSection: React.FC = () => {
  return (
    <div className={styles.chartsSection}>
      <ActiveMemberChart />
      <TariffMemberChart />
    </div>
  );
};

export default ChartsSection;
