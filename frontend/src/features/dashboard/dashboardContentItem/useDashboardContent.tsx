import { lazy, Suspense, useMemo } from "react";
import { ReactComponent as Admin } from "../../../assets/admin.svg";
import { ReactComponent as Clock } from "../../../assets/clock.svg";
import { ReactComponent as Grading } from "../../../assets/grading.svg";
import { ReactComponent as Profile } from "../../../assets/profile.svg";
import { ReactComponent as Training } from "../../../assets/training.svg";
import { ReactComponent as Users } from "../../../assets/users.svg";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { EventCalendarMyTrainings } from "../../eventCalendar/eventCalendarMyTrainings/EventCalendarMyTrainings";
import { MyGradingList } from "../../grading/myGradingList/MyGradingList";
import { MyProfile } from "../../myProfile/MyProfile";
import { Welcome } from "../../welcome/Welcome";
import styles from "./DashboardContentItem.module.scss";
import { IDashboardContentItem } from "./IDashboardContentItem";

export const useDashboardContent = () => {
  const { t } = useTranslation();

  const UserProfileSection = lazy(
    () => import("../../users/userProfileSection/UserProfileSection")
  );

  const EventCalendarPlanSection = lazy(
    () =>
      import(
        "../../eventCalendar/eventCalendarPlanSection/EventCalendarPlanSection"
      )
  );

  const AdminSection = lazy(
    () => import("../../admin/adminSection/AdminSection")
  );

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
        content: (
          <Suspense fallback={<PageSpinner />}>
            <UserProfileSection />
          </Suspense>
        ),
        icon: <Users className={styles.icon} />,
        needsAdmin: true,
        path: AppRoutes.users.toPath(),
        title: t(texts.dashboard.users),
      },
      {
        content: (
          <Suspense fallback={<PageSpinner />}>
            <EventCalendarPlanSection />
          </Suspense>
        ),
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
      {
        content: (
          <Suspense fallback={<PageSpinner />}>
            <AdminSection />
          </Suspense>
        ),
        icon: <Admin className={styles.icon} />,
        needsAdmin: true,
        path: AppRoutes.admin.toPath(),
        title: t(texts.dashboard.admin),
      },
    ],
    [AdminSection, EventCalendarPlanSection, UserProfileSection, t]
  );

  return {
    items,
  };
};
