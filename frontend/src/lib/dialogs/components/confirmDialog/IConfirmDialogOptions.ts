import { ReactNode } from "react";

export interface IConfirmDialogOptions {
  displayCancelButton?: boolean;

  /**
   * Set an alternative cancel button caption.
   */
  cancelButtonCaption?: string;

  /**
   * Set an alternative okay button caption.
   */
  okayButtonCaption?: string;

  onCancel?: () => void;
  onOkay?: () => void;

  /**
   * Set additional toolbar content like buttons.
   */
  toolbarContent?: ReactNode;
}
