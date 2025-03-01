import { ActiveMemberChart } from "./activeMemberChart/ActiveMemberChart";
import styles from "./ChartsSection.module.scss";

const ChartsSection: React.FC = () => {
  return (
    <div className={styles.chartsSection}>
      <ActiveMemberChart />
    </div>
  );
};

export default ChartsSection;
