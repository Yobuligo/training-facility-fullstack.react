import { Button } from "../../button/Button";
import { SecondaryButton } from "../../secondaryButton/SecondaryButton";
import { Toolbar } from "../../toolbar/Toolbar";
import { ModalDialog } from "../modalDialog/ModalDialog";
import styles from "./ConfirmDialog.module.scss";
import { IConfirmDialogProps } from "./IConfirmDialogProps";

export const ConfirmDialog: React.FC<IConfirmDialogProps> = (props) => {
  const footer = (
    <div className={styles.footer}>
      <Toolbar>
        <SecondaryButton>Cancel</SecondaryButton>
        <Button>Ok</Button>
      </Toolbar>
    </div>
  );

  return (
    <ModalDialog title={props.title} footer={footer}>
      {props.children}
    </ModalDialog>
  );
};
