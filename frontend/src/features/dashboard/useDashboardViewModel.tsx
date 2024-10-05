import { useEffect, useState } from "react";
import { ITabItem } from "../../components/tabStrip/ITabItem";
import { useAuth } from "../../hooks/useAuth";
import { IDashboardProps } from "./IDashboardProps";
import { EventCalendarMyTrainings } from "../eventCalendar/eventCalendarMyTrainings/EventCalendarMyTrainings";
import { EventCalendarPlanSection } from "../eventCalendar/eventCalendarPlanSection/EventCalendarPlanSection";
import { MyGradingList } from "../grading/myGradingList/MyGradingList";
import { MyProfile } from "../myProfile/MyProfile";
import { UserProfileSection } from "../users/userProfileSection/UserProfileSection";
import { useTranslation } from "../../lib/translation/useTranslation";
import { texts } from "../../lib/translation/texts";
import { useScreenSize } from "../../hooks/useScreenSize";
import { Welcome } from "../welcome/Welcome";
import { ReactComponent as Users } from "../../assets/users.svg";
import { ReactComponent as Profile } from "../../assets/profile.svg";
import { ReactComponent as Clock } from "../../assets/clock.svg";
import { ReactComponent as Training } from "../../assets/training.svg";
import { ReactComponent as Grading } from "../../assets/grading.svg";
import { IItem } from "../../core/types/IItem";
import styles from "./Dashboard.module.scss";

export const useDashboardViewModel = (props: IDashboardProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(-1);
  const auth = useAuth();
  const { isSmall } = useScreenSize();

  useEffect(() => {
    if (props.displayWelcomeSignal) {
      setSelected(-1);
    }
  }, [props.displayWelcomeSignal]);

  const onSelect = (index: number): void => setSelected(index);

  const getTabItems = (): ITabItem[] => {
    const tabItems: ITabItem[] = [];

    if (auth.isAdmin()) {
      tabItems.push({
        title: t(texts.dashboard.users),
        content: <UserProfileSection />,
        icon: <Users className={styles.icon} />,
      });
      tabItems.push({
        title: t(texts.dashboard.planner),
        content: <EventCalendarPlanSection />,
        icon: <Clock className={styles.icon} />,
      });
    }

    tabItems.push({
      title: t(texts.dashboard.trainings),
      content: <EventCalendarMyTrainings />,
      icon: <Training className={styles.icon} />,
    });

    tabItems.push({
      title: t(texts.dashboard.gradings),
      content: <MyGradingList />,
      icon: <Grading className={styles.icon} />,
    });

    tabItems.push({
      title: t(texts.dashboard.profile),
      content: <MyProfile />,
      icon: <Profile className={styles.icon} />,
    });
    return tabItems;
  };

  const tabItems = getTabItems();
  const needsBurgerMenu = isSmall() && tabItems.length > 4;
  const items: IItem[] = tabItems.map((tabItem) => {
    return { title: tabItem.title, icon: tabItem.icon };
  });
  const content = selected === -1 ? <Welcome /> : tabItems[selected].content;
  const burgerMenuTabItems = selected === -1 ? [] : [tabItems[selected]];

  return {
    burgerMenuTabItems,
    items,
    content,
    needsBurgerMenu,
    onSelect,
    selected,
    tabItems,
  };
};
