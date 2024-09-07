import { useState } from "react";
import { ToastSection } from "../../../lib/toast/components/toastSection/ToastSection";
import { ToastContext } from "../../../lib/toast/context/ToastContext";
import { IToast } from "../../../lib/toast/model/IToast";
import { IPageProps } from "./IPageProps";
import styles from "./Page.module.scss";

export const Page: React.FC<IPageProps> = (props) => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  return (
    <ToastContext.Provider value={{ toasts: [toasts, setToasts] }}>
      <div className={styles.page}>
        <ToastSection />
        <div>{props.children}</div>
      </div>
    </ToastContext.Provider>
  );
};
