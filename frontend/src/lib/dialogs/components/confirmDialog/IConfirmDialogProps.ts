import { ReactNode } from "react";

export interface IConfirmDialogProps {
  /**
   * Set an alternative cancel button caption.
   */
  cancelButtonCaption?: string;

  children?: ReactNode;
  displayCancelButton?: boolean;

  /**
   * Set an alternative okay button caption.
   */
  okayButtonCaption?: string;

  onCancel?: () => void;
  onOkay?: () => void;
  title: string;
}
