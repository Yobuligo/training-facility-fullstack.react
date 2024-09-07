import { List } from "../../../../core/services/list/List";
import { ToastList } from "../toastList/ToastList";
import styles from "./ToastSection.module.scss";
import { useToastSectionViewModel } from "./useToastSectionViewModel";

export const ToastSection: React.FC = () => {
  const viewModel = useToastSectionViewModel();

  return (
    <>
      {List.isNotEmpty(viewModel.toasts) && (
        <div className={styles.toastSection}>
          <ToastList onClose={viewModel.onClose} toasts={viewModel.toasts} />
        </div>
      )}
    </>
  );
};
