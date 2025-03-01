import { ActiveMemberChart } from "./activeMemberChart/ActiveMemberChart";
import styles from "./ChartsSection.module.scss";

const ChartsSection: React.FC = () => {
  return (
    <div className={styles.chartsSection}>
      <ActiveMemberChart />
      {/* <TariffMemberChart /> */}
    </div>
  );
};

export default ChartsSection;
