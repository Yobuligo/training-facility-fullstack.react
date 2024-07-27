import { LogoIcon } from "../../../icons/LogoIcon";
import styles from "./PageHeader.module.scss";

export const PageHeader: React.FC = () => {
  return (
    <header className={styles.pageHeader}>
      <LogoIcon />
    </header>
  );
};
