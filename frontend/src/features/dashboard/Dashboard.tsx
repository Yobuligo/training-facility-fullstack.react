import { useEffect, useState } from "react";
import { ITabItem } from "../../components/tabStrip/ITabItem";
import { TabStrip } from "../../components/tabStrip/TabStrip";
import { TabStripContent } from "../../components/tabStripContent/TabStripContent";
import { useAuth } from "../../hooks/useAuth";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { EventCalendarMyTrainings } from "../eventCalendar/eventCalendarMyTrainings/EventCalendarMyTrainings";
import { EventCalendarPlanSection } from "../eventCalendar/eventCalendarPlanSection/EventCalendarPlanSection";
import { MyProfile } from "../myProfile/MyProfile";
import { UserProfileSection } from "../users/userProfileSection/UserProfileSection";
import { Welcome } from "../welcome/Welcome";
import styles from "./Dashboard.module.scss";
import { IDashboardProps } from "./IDashboardProps";

export const Dashboard: React.FC<IDashboardProps> = (props) => {
  const [selected, setSelected] = useState(-1);
  const { t } = useTranslation();
  const auth = useAuth();

  useEffect(() => {
    if (props.displayWelcomeSignal) {
      setSelected(-1);
    }
  }, [props.displayWelcomeSignal]);

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
      title: t(texts.dashboard.myTrainings),
      content: <EventCalendarMyTrainings />,
    });

    tabItems.push({
      title: t(texts.dashboard.myProfile),
      content: <MyProfile />,
    });
    return tabItems;
  };

  const onSelect = (tabItem: ITabItem, index: number): void =>
    setSelected(index);

  return (
    <div>
      <TabStrip
        className={styles.dashboard}
        onSelect={onSelect}
        selected={selected}
        tabItems={getTabItems()}
      />
      <TabStripContent
        children={
          selected === -1 ? (
            <div className={styles.dashboardContent}>
              <Welcome />
            </div>
          ) : (
            <div className={styles.dashboardContent}>
              {getTabItems()[selected].content}
            </div>
          )
        }
      />
    </div>
  );
};
