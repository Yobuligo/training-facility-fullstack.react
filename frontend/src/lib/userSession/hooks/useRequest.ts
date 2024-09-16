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
    errorHandler?: (error: any) => boolean
  ) => Promise<void>,
  isProcessing: boolean
] => {
  const [isProcessing, setIsProcessing] = useState(false);
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
        toast.info(t(texts.general.logoutInvalidSession));
        logout.logout();
        return;
      } else if (error.type === "MissingAuthorityError") {
        toast.error(t(texts.general.errorMissingAuthority));
      } else {
        // unknown error navigate to error boundary page
        console.log("Unknown error due to REST request.");
        navigate(AppRoutes.error.toPath());
      }
    },
    [toast, t, logout, navigate]
  );

  const send = useCallback(
    async (
      block: () => Promise<void>,
      errorHandler?: (error: any) => boolean
    ) => {
      // leave, if request is already running,
      if (isProcessing === true) {
        return;
      }

      setIsProcessing(true);
      try {
        await block();
      } catch (error) {
        // does an error handler handles the error?
        if (!errorHandler || !errorHandler(error)) {
          if (isError(error)) {
            handleError(error);
          } else {
            // unknown error navigate to error boundary page
            console.log("Unknown error due to REST request.");
            navigate(AppRoutes.error.toPath());
          }
        }
      }
      setIsProcessing(false);
    },
    [handleError, isProcessing, navigate]
  );

  return [send, isProcessing];
};
