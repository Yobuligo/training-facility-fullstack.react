import { isError } from "../../../core/utils/isError";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";

export const useHandleSendEmailError = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const handleSendMailError = (error: any): boolean => {
    if (isError(error) && error.type === "SendEmailError") {
      toast.error(t(texts.user.errorSendEmail));
      return true;
    } else {
      return false;
    }
  };

  return handleSendMailError;
};
