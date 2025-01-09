import { Outlet } from "react-router-dom";
import { BurgerMenu } from "../../../components/burgerMenu/BurgerMenu";
import { TabStrip } from "../../../components/tabStrip/TabStrip";
import { TabStripContent } from "../../../components/tabStripContent/TabStripContent";
import { style } from "../../../core/ui/style";
import styles from "./Dashboard.module.scss";
import { IDashboardProps } from "./IDashboardProps";
import { useDashboardViewModel } from "./useDashboardViewModel";

export const Dashboard: React.FC<IDashboardProps> = (props) => {
  const viewModel = useDashboardViewModel(props);

  return (
    <div>
      {viewModel.needsBurgerMenu && (
        <div className={style(styles.navigation, styles.burgerMenuAndTabStrip)}>
          <BurgerMenu
            className={styles.burgerMenu}
            items={viewModel.items}
            onEntrySelect={(index) => viewModel.onSelect(index)}
          />
          <TabStrip
            tabItems={viewModel.burgerMenuTabItems}
            selected={0}
            className={styles.tabStripWithBurgerMenu}
          />
        </div>
      )}
      {!viewModel.needsBurgerMenu && (
        <TabStrip
          className={styles.navigation}
          onSelect={(_, index) => viewModel.onSelect(index)}
          selected={viewModel.selected}
          tabItems={viewModel.tabItems}
        />
      )}

      {/* Used to display the TabStrip content */}
      <Outlet />

      <TabStripContent
        children={
          <div className={styles.dashboardContent}>{viewModel.content}</div>
        }
      />
    </div>
  );
};
