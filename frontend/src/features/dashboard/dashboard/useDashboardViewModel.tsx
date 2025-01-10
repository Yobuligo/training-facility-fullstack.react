import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Clock } from "../../../assets/clock.svg";
import { ReactComponent as Grading } from "../../../assets/grading.svg";
import { ReactComponent as Profile } from "../../../assets/profile.svg";
import { ReactComponent as Training } from "../../../assets/training.svg";
import { ReactComponent as Users } from "../../../assets/users.svg";
import { IItem } from "../../../core/types/IItem";
import { useAuth } from "../../../hooks/useAuth";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import styles from "./Dashboard.module.scss";
import { IDashboardProps } from "./IDashboardProps";
import { IDashboardTabItem } from "./IDashboardTabItem";

export const useDashboardViewModel = (props: IDashboardProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(-1);
  const auth = useAuth();
  const { isSmall } = useScreenSize();
  const navigate = useNavigate();

  useEffect(() => {
    if (props.displayWelcomeSignal) {
      setSelected(-1);
    }
  }, [props.displayWelcomeSignal]);

  const onSelectNew = (index: number): void => {
    setSelected(index);
    if (index === -1) {
      navigate(AppRoutes.dashboard.toPath());
    } else {
      const path = getTabItems()[index].path;
      navigate(path);
    }
  };

  const getTabItems = (): IDashboardTabItem[] => {
    const tabItems: IDashboardTabItem[] = [];

    if (auth.isAdmin()) {
      tabItems.push({
        path: AppRoutes.users.toPath(),
        title: t(texts.dashboard.users),
        content: <></>,
        icon: <Users className={styles.icon} />,
      });
      tabItems.push({
        path: AppRoutes.planers.toPath(),
        title: t(texts.dashboard.planner),
        content: <></>,
        icon: <Clock className={styles.icon} />,
      });
    }

    tabItems.push({
      path: AppRoutes.trainings.toPath(),
      title: t(texts.dashboard.trainings),
      content: <></>,
      icon: <Training className={styles.icon} />,
    });

    tabItems.push({
      path: AppRoutes.gradings.toPath(),
      title: t(texts.dashboard.gradings),
      content: <></>,
      icon: <Grading className={styles.icon} />,
    });

    tabItems.push({
      path: AppRoutes.profile.toPath(),
      title: t(texts.dashboard.profile),
      content: <></>,
      icon: <Profile className={styles.icon} />,
    });
    return tabItems;
  };

  const tabItems = getTabItems();
  const needsBurgerMenu = isSmall() && tabItems.length > 4;
  const items: IItem[] = tabItems.map((tabItem) => {
    return { title: tabItem.title, icon: tabItem.icon };
  });
  const burgerMenuTabItems = selected === -1 ? [] : [tabItems[selected]];

  return {
    burgerMenuTabItems,
    items,
    needsBurgerMenu,
    onSelect: onSelectNew,
    selected,
    tabItems,
  };
};
