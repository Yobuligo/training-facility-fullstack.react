import { AppLogo } from "../../../icons/AppLogo";
import { LanguageSelect } from "../../language/languageSelect/LanguageSelect";
import { IPageHeaderProps } from "./IPageHeaderProps";
import styles from "./PageHeader.module.scss";

export const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  return (
    <header className={styles.pageHeader}>
      <div>
        <AppLogo className={styles.appLogo} onClick={props.onAppLogoClick} />
      </div>
      <div className={styles.right}>
        <LanguageSelect />
        {props.children}
      </div>
    </header>
  );
};
