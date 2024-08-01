import { AppLogo } from "../../../icons/AppLogo";
import { IPageHeaderProps } from "./IPageHeaderProps";
import styles from "./PageHeader.module.scss";

export const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  return (
    <header className={styles.pageHeader}>
      <div></div>
      <div>
        <AppLogo className={styles.appLogo} />
      </div>
      <div className={styles.right}>{props.children}</div>
    </header>
  );
};
