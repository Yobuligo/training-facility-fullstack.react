import { ReactNode, useState } from "react";
import { ConfirmDialog } from "../components/confirmDialog/ConfirmDialog";
import { IConfirmDialogOptions } from "../components/confirmDialog/IConfirmDialogOptions";

export const useConfirmDialog = () => {
  const [display, setDisplay] = useState(false);
  const [title, setTitle] = useState("");
  const [dialogContent, setDialogContent] = useState<ReactNode | undefined>(
    undefined
  );
  //   let confirmDialogOptions: IConfirmDialogOptions = useMemo(() => ({}), []);
  const [confirmDialogOptions, setConfirmDialogOptions] = useState<
    IConfirmDialogOptions | undefined
  >(undefined);

  const reset = () => {
    setTitle("");
    setDialogContent(undefined);
    setDisplay(false);
  };

  const onCancel = () => reset();

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
        <ConfirmDialog title={title} onCancel={onCancel} onOkay={onOkay}>
          {dialogContent}
        </ConfirmDialog>
      )}
    </>
  );

  const show = (
    title: string,
    content: ReactNode,
    options: IConfirmDialogOptions
  ) => {
    setTitle(title);
    setDialogContent(content);
    setConfirmDialogOptions(options);
    // confirmDialogOptions = options;
    setDisplay(true);
  };

  return {
    content,
    show,
  };
};
