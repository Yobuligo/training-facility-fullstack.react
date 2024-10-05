import styles from "./MemberOnlyIcon.module.scss";
import { PrivateIcon } from "./PrivateIcon";

export const MemberOnlyIcon: React.FC = () => {
  return <PrivateIcon className={styles.icon} />;
};
