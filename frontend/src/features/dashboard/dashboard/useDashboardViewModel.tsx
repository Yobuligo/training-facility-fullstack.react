import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IItem } from "../../../core/types/IItem";
import { useAuth } from "../../../hooks/useAuth";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { AppRoutes } from "../../../routes/AppRoutes";
import { useDashboardContent } from "../dashboardContentItem/useDashboardContent";
import { IDashboardProps } from "./IDashboardProps";
import { IDashboardTabItem } from "./IDashboardTabItem";

export const useDashboardViewModel = (props: IDashboardProps) => {
  const [selected, setSelected] = useState(-1);
  const auth = useAuth();
  const { isSmall } = useScreenSize();
  const navigate = useNavigate();
  const dashboardContent = useDashboardContent();
  const location = useLocation();

  useEffect(() => {
    if (props.displayWelcomeSignal) {
      setSelected(-1);
      navigate(AppRoutes.dashboard.toPath());
    }
  }, [navigate, props.displayWelcomeSignal]);

  const getTabItems = useCallback((): IDashboardTabItem[] => {
    const tabItems: IDashboardTabItem[] = [];
    dashboardContent.items.forEach((dashboardItem) => {
      // Exclude DashboardPage itself with path /
      if (
        dashboardItem.path !== AppRoutes.dashboard.toPath() &&
        (!dashboardItem.needsAdmin || auth.isAdmin())
      ) {
        tabItems.push({
          content: <></>, // content must be empty and will be handled by DashboardContent
          path: dashboardItem.path,
          title: dashboardItem.title,
          icon: dashboardItem.icon,
        });
      }
    });
    return tabItems;
  }, [auth, dashboardContent.items]);

  const tabItems = getTabItems();

  useEffect(() => {
    // selects a tab from the given url (location)
    // e.g. if a specific training was called via deep link, the corresponding tab has to be selected.
    const tabItemIndex = tabItems.findIndex((dashboardTabItem) =>
      location.pathname.startsWith(dashboardTabItem.path)
    );
    setSelected(tabItemIndex);
  }, [location, tabItems]);

  const onSelect = (index: number): void => {
    setSelected(index);
    if (index === -1) {
      navigate(AppRoutes.dashboard.toPath());
    } else {
      const path = getTabItems()[index].path;
      navigate(path);
    }
  };

  const needsBurgerMenu = isSmall() && tabItems.length > 4;
  const items: IItem[] = tabItems.map((tabItem) => {
    return { title: tabItem.title, icon: tabItem.icon };
  });
  const burgerMenuTabItems = selected === -1 ? [] : [tabItems[selected]];

  return {
    burgerMenuTabItems,
    items,
    needsBurgerMenu,
    onSelect,
    selected,
    tabItems,
  };
};
