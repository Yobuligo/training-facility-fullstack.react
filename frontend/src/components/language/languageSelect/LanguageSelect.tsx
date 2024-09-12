import { ILanguageSelectProps } from "./ILanguageSelectProps";
import styles from "./LanguageSelect.module.scss";

export const LanguageSelect: React.FC<ILanguageSelectProps> = (props) => {
  return (
    <div className={styles.languageSelect}>
      <div>DE</div>
      <div>|</div>
      <div>EN</div>
    </div>
  );
};
