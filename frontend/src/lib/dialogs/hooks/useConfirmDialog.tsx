import { ReactNode, useMemo, useState } from "react";
import { ConfirmDialog } from "../components/confirmDialog/ConfirmDialog";

interface IHandlerTray {
  handler: (() => void) | undefined;
}

export const useConfirmDialog = () => {
  const [display, setDisplay] = useState(false);
  const [title, setTitle] = useState("");
  const [dialogContent, setDialogContent] = useState<ReactNode | undefined>(
    undefined
  );
  let dialogOnOkay: IHandlerTray = useMemo(
    () => ({
      handler: undefined,
    }),
    []
  );

  const reset = () => {
    setTitle("");
    setDialogContent(undefined);
    setDisplay(false);
  };

  const onCancel = () => reset();

  const onOkay = () => {
    dialogOnOkay.handler?.();
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

  const show = (title: string, content: ReactNode, onOkay?: () => void) => {
    setTitle(title);
    setDialogContent(content);
    dialogOnOkay.handler = onOkay;
    setDisplay(true);
  };

  return {
    content,
    show,
  };
};
