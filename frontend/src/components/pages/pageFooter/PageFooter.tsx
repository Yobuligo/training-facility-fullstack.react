import { AppConfig } from "../../../AppConfig";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import styles from "./PageFooter.module.scss";

export const PageFooter: React.FC = () => {
  const { t } = useTranslation();
  const confirmDialog = useConfirmDialog();

  const onVersionClick = () => {
    const build = `${AppConfig.build.version}-${AppConfig.build.date}.${AppConfig.build.number}`;
    confirmDialog.show("Version", `Build: ${build}`, {
      displayCancelButton: false,
    });
  };

  return (
    <footer className={styles.pageFooter}>
      {confirmDialog.content}
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
      <div className={styles.version} onClick={onVersionClick}>
        {AppConfig.build.version}
      </div>
    </footer>
  );
};
