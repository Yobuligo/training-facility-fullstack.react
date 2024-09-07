import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IError } from "../../../core/types/IError";
import { isError } from "../../../core/utils/isError";
import { AppRoutes } from "../../../routes/AppRoutes";
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
  const navigate = useNavigate();

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
        console.log("Unknown error due REST request.");
        navigate(AppRoutes.error.toPath());
      }
    },
    [toast, t, logout, navigate]
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
            console.log("Unknown error due REST request.");
            navigate(AppRoutes.error.toPath());
          }
        }
      }
      setIsLoading(false);
    },
    [handleError, navigate, toast]
  );

  return [send, isProcessing];
};
