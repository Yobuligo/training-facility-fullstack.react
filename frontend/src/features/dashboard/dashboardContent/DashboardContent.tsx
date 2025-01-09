import { useParams } from "react-router-dom";
import { TabStripContent } from "../../../components/tabStripContent/TabStripContent";
import styles from "./DashboardContent.module.scss";
import { useDashboardContentViewModel } from "./useDashboardContentViewModel";

export const DashboardContent: React.FC = () => {
  const params = useParams<{ itemId: string }>();
  const viewModel = useDashboardContentViewModel();

  // Todo: check for invalid tab

  return (
    <TabStripContent
      children={<div className={styles.content}>{viewModel.content}</div>}
    />
  );
};
