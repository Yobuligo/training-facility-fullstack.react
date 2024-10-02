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
      });
      tabItems.push({
        title: t(texts.dashboard.planner),
        content: <EventCalendarPlanSection />,
      });
    }

    tabItems.push({
      title: t(texts.dashboard.trainings),
      content: <EventCalendarMyTrainings />,
    });

    tabItems.push({
      title: t(texts.dashboard.gradings),
      content: <MyGradingList />,
    });

    tabItems.push({
      title: t(texts.dashboard.profile),
      content: <MyProfile />,
    });
    return tabItems;
  };

  const tabItems = getTabItems();
  const needsBurgerMenu = isSmall() && tabItems.length > 4;
  const captions = tabItems.map((tabItem) => tabItem.title);
  const content = selected === -1 ? <Welcome /> : tabItems[selected].content;
  const burgerMenuTabItems = selected === -1 ? [] : [tabItems[selected]];

  return {
    burgerMenuTabItems,
    captions,
    content,
    needsBurgerMenu,
    onSelect,
    selected,
    tabItems,
  };
};
