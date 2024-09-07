import { useCallback, useState } from "react";
import { IError } from "../../../core/types/IError";
import { isError } from "../../../core/utils/isError";
import { useToast } from "../../toast/hooks/useToast";
import { texts } from "../../translation/texts";
import { useTranslation } from "../../translation/useTranslation";
import { useLogout } from "./useLogout";

export const useRequest = (): [
  send: (
    block: () => Promise<void>,
    errorHandler?: (error: any) => string
  ) => Promise<void>,
  isProcessing: boolean
] => {
  const [isProcessing, setIsLoading] = useState(false);
  const logout = useLogout();
  const { t } = useTranslation();
  const toast = useToast();

  const handleError = useCallback(
    (error: IError) => {
      if (
        error.type === "NoSessionError" ||
        error.type === "InvalidSessionError" ||
        error.type === "ExpiredSessionError"
      ) {
        toast.error(t(texts.general.logoutInvalidSession));
        logout.logout();
        return;
      } else {
        toast.error(t(texts.general.errorUnknownDueREST));
      }
    },
    [logout, toast, t]
  );

  const send = useCallback(
    async (
      block: () => Promise<void>,
      errorHandler?: (error: any) => string
    ) => {
      setIsLoading(true);
      try {
        await block();
      } catch (error) {
        // does an error handler handles the error?
        if (errorHandler) {
          toast.error(errorHandler(error));
        } else {
          if (isError(error)) {
            handleError(error);
          } else {
            toast.error(t(texts.general.errorUnknownDueREST));
          }
        }
      }
      setIsLoading(false);
    },
    [handleError, t, toast]
  );

  return [send, isProcessing];
};
