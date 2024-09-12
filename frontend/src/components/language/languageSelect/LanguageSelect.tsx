import { style } from "../../../core/ui/style";
import { Language } from "../../../lib/language/types/Language";
import { useLanguage } from "../../../lib/language/useLanguage";
import { ILanguageSelectProps } from "./ILanguageSelectProps";
import styles from "./LanguageSelect.module.scss";

export const LanguageSelect: React.FC<ILanguageSelectProps> = (props) => {
  const [language, setLanguage] = useLanguage();

  const onSelectLanguage = (language: Language) => setLanguage(language);

  return (
    <div className={styles.languageSelect}>
      <div
        className={style(
          styles.language,
          language === Language.DE ? styles.selected : ""
        )}
        onClick={() => onSelectLanguage(Language.DE)}
      >
        DE
      </div>
      <div>|</div>
      <div
        className={style(
          styles.language,
          language === Language.EN ? styles.selected : ""
        )}
        onClick={() => onSelectLanguage(Language.EN)}
      >
        EN
      </div>
    </div>
  );
};
