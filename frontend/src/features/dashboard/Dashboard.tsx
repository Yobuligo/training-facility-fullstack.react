import { useEffect, useState } from "react";
import { ITabItem } from "../../components/tabStrip/ITabItem";
import { TabStrip } from "../../components/tabStrip/TabStrip";
import { TabStripContent } from "../../components/tabStripContent/TabStripContent";
import { useSession } from "../../hooks/useSession";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { MyProfile } from "../myProfile/MyProfile";
import { UserProfileSection } from "../users/userProfileSection/UserProfileSection";
import { Welcome } from "../welcome/Welcome";
import { IDashboardProps } from "./IDashboardProps";

export const Dashboard: React.FC<IDashboardProps> = (props) => {
  const [selected, setSelected] = useState(-1);
  const { t } = useTranslation();
  const [session] = useSession();

  useEffect(() => {
    if (props.displayWelcomeSignal) {
      setSelected(-1);
    }
  }, [props.displayWelcomeSignal]);

  const getTabItems = (): ITabItem[] => {
    const tabItems: ITabItem[] = [];

    if (session?.isAdmin) {
      tabItems.push({
        title: t(texts.dashboard.users),
        content: <UserProfileSection />,
      });
      tabItems.push({
        title: t(texts.dashboard.trainings),
        content: <>Trainings</>,
      });
    }

    tabItems.push({
      title: t(texts.dashboard.myTrainings),
      content: <>My trainings</>,
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
        onSelect={onSelect}
        selected={selected}
        tabItems={getTabItems()}
      />
      <TabStripContent
        children={
          selected === -1 ? <Welcome /> : getTabItems()[selected].content
        }
      />
    </div>
  );
};
