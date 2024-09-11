import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Button } from "../../button/Button";
import { SecondaryButton } from "../../secondaryButton/SecondaryButton";
import { Toolbar } from "../../toolbar/Toolbar";
import { ModalDialog } from "../modalDialog/ModalDialog";
import styles from "./ConfirmDialog.module.scss";
import { IConfirmDialogProps } from "./IConfirmDialogProps";

export const ConfirmDialog: React.FC<IConfirmDialogProps> = (props) => {
  const { t } = useTranslation();

  const footer = (
    <div className={styles.footer}>
      <Toolbar>
        <SecondaryButton onClick={props.onCancel}>
          {t(texts.general.cancel)}
        </SecondaryButton>
        <Button onClick={props.onOkay}>{t(texts.general.ok)}</Button>
      </Toolbar>
    </div>
  );

  return (
    <ModalDialog title={props.title} footer={footer}>
      {props.children}
    </ModalDialog>
  );
};
