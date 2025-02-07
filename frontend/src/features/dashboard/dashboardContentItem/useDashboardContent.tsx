import { useMemo } from "react";
import { ReactComponent as Clock } from "../../../assets/clock.svg";
import { ReactComponent as Grading } from "../../../assets/grading.svg";
import { ReactComponent as Profile } from "../../../assets/profile.svg";
import { ReactComponent as Training } from "../../../assets/training.svg";
import { ReactComponent as Users } from "../../../assets/users.svg";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { AdminSection } from "../../admin/adminSection/AdminSection";
import { EventCalendarMyTrainings } from "../../eventCalendar/eventCalendarMyTrainings/EventCalendarMyTrainings";
import { EventCalendarPlanSection } from "../../eventCalendar/eventCalendarPlanSection/EventCalendarPlanSection";
import { MyGradingList } from "../../grading/myGradingList/MyGradingList";
import { MyProfile } from "../../myProfile/MyProfile";
import { UserProfileSection } from "../../users/userProfileSection/UserProfileSection";
import { Welcome } from "../../welcome/Welcome";
import styles from "./DashboardContentItem.module.scss";
import { IDashboardContentItem } from "./IDashboardContentItem";

export const useDashboardContent = () => {
  const { t } = useTranslation();

  const items = useMemo<IDashboardContentItem[]>(
    () => [
      {
        content: <Welcome />,
        icon: <></>,
        needsAdmin: false,
        path: AppRoutes.dashboard.toPath(),
        title: "",
      },
      {
        content: <AdminSection />,
        icon: <Training className={styles.icon} />,
        needsAdmin: true,
        path: AppRoutes.admin.toPath(),
        title: t(texts.dashboard.admin),
      },      
      {
        content: <UserProfileSection />,
        icon: <Users className={styles.icon} />,
        needsAdmin: true,
        path: AppRoutes.users.toPath(),
        title: t(texts.dashboard.users),
      },
      {
        content: <EventCalendarPlanSection />,
        icon: <Clock className={styles.icon} />,
        needsAdmin: true,
        path: AppRoutes.planers.toPath(),
        title: t(texts.dashboard.planner),
      },
      {
        content: <EventCalendarMyTrainings />,
        icon: <Training className={styles.icon} />,
        needsAdmin: false,
        path: AppRoutes.trainings.toPath(),
        title: t(texts.dashboard.trainings),
      },
      {
        content: <MyGradingList />,
        icon: <Grading className={styles.icon} />,
        needsAdmin: false,
        path: AppRoutes.gradings.toPath(),
        title: t(texts.dashboard.gradings),
      },
      {
        content: <MyProfile />,
        icon: <Profile className={styles.icon} />,
        needsAdmin: false,
        path: AppRoutes.profile.toPath(),
        title: t(texts.dashboard.profile),
      },
    ],
    [t]
  );

  return {
    items,
  };
};
