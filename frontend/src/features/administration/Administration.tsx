import { TabStrip } from "../../components/tabStrip/TabStrip";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";

export const Administration: React.FC = () => {
  const { t } = useTranslation();

  return (
    <TabStrip
      tabItems={[
        { title: t(texts.administration.users), content: <>Users</> },
        { title: t(texts.administration.trainings), content: <>Trainings</> },
        { title: t(texts.administration.home), content: <>Trainings</> },
      ]}
    />
  );
};
