import { Button } from "../../../../components/button/Button";
import { NotSupportedError } from "../../../../core/errors/NotSupportedError";
import { style } from "../../../../core/ui/style";
import { CloseIcon } from "../../../../icons/CloseIcon";
import { useRenderToastSeverity } from "../../hooks/useRenderToastSeverity";
import { ToastSeverity } from "../../types/ToastSeverity";
import { IToastItemProps } from "./IToastItemProps";
import styles from "./ToastItem.module.scss";

export const ToastItem: React.FC<IToastItemProps> = (props) => {
  const renderToastSeverity = useRenderToastSeverity();

  const getBannerClassName = () => {
    switch (props.toast.severity) {
      case ToastSeverity.ERROR:
        return styles.bannerError;
      case ToastSeverity.INFO:
        return styles.bannerInfo;
      case ToastSeverity.SUCCESS:
        return styles.bannerSuccess;
      case ToastSeverity.WARNING:
        return styles.bannerWarning;
      default:
        throw new NotSupportedError();
    }
  };

  const getBodyClassName = () => {
    switch (props.toast.severity) {
      case ToastSeverity.ERROR:
        return styles.bodyError;
      case ToastSeverity.INFO:
        return styles.bodyInfo;
      case ToastSeverity.SUCCESS:
        return styles.bodySuccess;
      case ToastSeverity.WARNING:
        return styles.bodyWarning;
      default:
        throw new NotSupportedError();
    }
  };

  const onClose = () => props.onClose?.(props.toast);

  return (
    <div className={styles.toastItem}>
      <div className={style(styles.banner, getBannerClassName())}></div>
      <div className={style(styles.body, getBodyClassName())}>
        <div className={styles.content}>
          <div className={styles.type}>
            {renderToastSeverity(props.toast.severity)}
          </div>
          {props.toast.message}
        </div>

        <Button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </Button>
      </div>
    </div>
  );
};
