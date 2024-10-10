import { AppConfig } from "../../../AppConfig";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import styles from "./PageFooter.module.scss";

export const PageFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.pageFooter}>
      <div></div>
      <div className={styles.imprintAndPrivacyPolicy}>
        <a
          className={styles.link}
          href={AppConfig.imprint}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(texts.general.imprint)}
        </a>
        |
        <a
          className={styles.link}
          href={AppConfig.privacyPolicy}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(texts.general.privacyPolicy)}
        </a>
      </div>
      <div className={styles.version}>{AppConfig.version}</div>
    </footer>
  );
};
