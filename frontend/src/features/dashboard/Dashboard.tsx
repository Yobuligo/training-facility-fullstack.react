import { ITabItem } from "../../components/tabStrip/ITabItem";
import { TabStrip } from "../../components/tabStrip/TabStrip";
import { useSession } from "../../hooks/useSession";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { MyProfile } from "../myProfile/MyProfile";
import { UserProfileSection } from "../users/userProfileSection/UserProfileSection";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [session] = useSession();

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

  return <TabStrip tabItems={getTabItems()} />;
};
