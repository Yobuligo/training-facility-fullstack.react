import { Button } from "../../../../components/button/Button";
import { SecondaryButton } from "../../../../components/secondaryButton/SecondaryButton";
import { Toolbar } from "../../../../components/toolbar/Toolbar";
import { texts } from "../../../translation/texts";
import { useTranslation } from "../../../translation/useTranslation";
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
