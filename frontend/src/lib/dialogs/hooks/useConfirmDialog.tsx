import { ReactNode, useState } from "react";
import { ConfirmDialog } from "../components/confirmDialog/ConfirmDialog";
import { IConfirmDialogOptions } from "../components/confirmDialog/IConfirmDialogOptions";

export const useConfirmDialog = () => {
  const [display, setDisplay] = useState(false);
  const [title, setTitle] = useState("");
  const [dialogContent, setDialogContent] = useState<ReactNode | undefined>(
    undefined
  );
  const [confirmDialogOptions, setConfirmDialogOptions] = useState<
    IConfirmDialogOptions | undefined
  >(undefined);

  const reset = () => {
    setTitle("");
    setDialogContent(undefined);
    setDisplay(false);
  };

  const onCancel = () => {
    confirmDialogOptions?.onCancel?.();
    reset();
  };

  const onOkay = () => {
    confirmDialogOptions?.onOkay?.();
    reset();
  };

  /**
   * The content must be embedded in the component.
   * When calling show, the content is displayed.
   */
  const content = (
    <>
      {display && (
        <ConfirmDialog
          displayCancelButton={confirmDialogOptions?.displayCancelButton}
          onCancel={onCancel}
          onOkay={onOkay}
          title={title}
        >
          {dialogContent}
        </ConfirmDialog>
      )}
    </>
  );

  const show = (
    title: string,
    content: ReactNode,
    options?: IConfirmDialogOptions
  ) => {
    setTitle(title);
    setDialogContent(content);
    setConfirmDialogOptions(options);
    setDisplay(true);
  };

  return {
    content,
    show,
  };
};
