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

  const onCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onCancel?.();
    event.stopPropagation();
  };

  const onOkay = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onOkay?.();
    event.stopPropagation();
  };

  const footer = (
    <div className={styles.footer}>
      <Toolbar>
        {props.displayCancelButton !== false && (
          <SecondaryButton onClick={onCancel}>
            {t(texts.general.cancel)}
          </SecondaryButton>
        )}
        <Button onClick={onOkay}>{t(texts.general.ok)}</Button>
      </Toolbar>
    </div>
  );

  return (
    <ModalDialog title={props.title} footer={footer}>
      {props.children}
    </ModalDialog>
  );
};
