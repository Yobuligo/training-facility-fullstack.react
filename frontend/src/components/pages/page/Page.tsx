import { useState } from "react";
import { ToastSection } from "../../../lib/toast/components/toastSection/ToastSection";
import { ToastContext } from "../../../lib/toast/context/ToastContext";
import { IToast } from "../../../lib/toast/model/IToast";
import { ToastSeverity } from "../../../lib/toast/types/ToastSeverity";
import { uuid } from "../../../utils/uuid";
import { IPageProps } from "./IPageProps";
import styles from "./Page.module.scss";

export const Page: React.FC<IPageProps> = (props) => {
  const [toasts, setToasts] = useState<IToast[]>([
    {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      message: "Hello World Internal Server Error",
      severity: ToastSeverity.ERROR,
    },
    {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      message: "Hello World for an info",
      severity: ToastSeverity.INFO,
    },
    {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      message: "Hello World for success message. Hello World for success message. Hello World for success message. Hello World for success message. Hello World for success message. Hello World for success message. Hello World for success message.",
      severity: ToastSeverity.SUCCESS,
    },
    {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      message: "Hello World for warning",
      severity: ToastSeverity.WARNING,
    },
  ]);
  return (
    <ToastContext.Provider value={{ toasts: [toasts, setToasts] }}>
      <div className={styles.page}>
        <ToastSection />
        <div>{props.children}</div>
      </div>
    </ToastContext.Provider>
  );
};
