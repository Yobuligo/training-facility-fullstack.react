import { TabStrip } from "../../components/tabStrip/TabStrip";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { UserProfileSection } from "../users/userProfileSection/UserProfileSection";

export const Administration: React.FC = () => {
  const { t } = useTranslation();

  return (
    <TabStrip
      tabItems={[
        {
          title: t(texts.administration.users),
          content: <UserProfileSection />,
        },
        { title: t(texts.administration.trainings), content: <>Trainings</> },
      ]}
    />
  );
};
