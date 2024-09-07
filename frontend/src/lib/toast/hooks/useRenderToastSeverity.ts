import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { texts } from "../../translation/texts";
import { useTranslation } from "../../translation/useTranslation";
import { ToastSeverity } from "../types/ToastSeverity";

export const useRenderToastSeverity = () => {
  const { t } = useTranslation();

  const render = (severity: ToastSeverity): string => {
    switch (severity) {
      case ToastSeverity.ERROR:
        return t(texts.general.toastSeverity.error);
      case ToastSeverity.INFO:
        return t(texts.general.toastSeverity.info);
      case ToastSeverity.SUCCESS:
        return t(texts.general.toastSeverity.success);
      case ToastSeverity.WARNING:
        return t(texts.general.toastSeverity.warning);
      default:
        throw new NotSupportedError();
    }
  };

  return render;
};
