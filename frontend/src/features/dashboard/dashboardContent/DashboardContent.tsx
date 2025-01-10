import { TabStripContent } from "../../../components/tabStripContent/TabStripContent";
import styles from "./DashboardContent.module.scss";
import { useDashboardContentViewModel } from "./useDashboardContentViewModel";

export const DashboardContent: React.FC = () => {
  const viewModel = useDashboardContentViewModel();

  return (
    <TabStripContent
      children={<div className={styles.content}>{viewModel.getContent()}</div>}
    />
  );
};
