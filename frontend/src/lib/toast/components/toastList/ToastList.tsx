import { ToastItem } from "../toastItem/ToastItem";
import { IToastListProps } from "./IToastListProps";
import styles from "./ToastList.module.scss";

export const ToastList: React.FC<IToastListProps> = (props) => {
  const items = props.toasts.map((toast) => (
    <ToastItem key={toast.id} onClose={props.onClose} toast={toast} />
  ));

  return <div className={styles.toastList}>{items}</div>;
};
