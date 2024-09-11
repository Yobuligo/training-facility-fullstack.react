import { Backdrop } from "../../backdrop/Backdrop";
import { Dialog } from "../dialog/Dialog";
import { IModalDialogProps } from "./IModalDialogProps";

export const ModalDialog: React.FC<IModalDialogProps> = (props) => {
  return (
    <Backdrop>
      <Dialog {...props} />
    </Backdrop>
  );
};
