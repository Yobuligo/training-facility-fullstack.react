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
import { Welcome } from "../../welcome/Welcome";
import styles from "./DashboardContentItem.module.scss";
import { IDashboardContentItem } from "./IDashboardContentItem";

const UserProfileSection = lazy(
  () => import("../../users/userProfileSection/UserProfileSection")
);

const EventCalendarPlanSection = lazy(
  () =>
    import(
      "../../eventCalendar/eventCalendarPlanSection/EventCalendarPlanSection"
    )
);

const MyGradingList = lazy(
  () => import("../../grading/myGradingList/MyGradingList")
);

const MyProfile = lazy(() => import("../../myProfile/MyProfile"));

const StatsSection = lazy(() => import("../../stats/StatsSection"));

const AdminSection = lazy(
  () => import("../../admin/adminSection/AdminSection")
);

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
        content: (
          <Suspense fallback={<PageSpinner />}>
            <MyGradingList />
          </Suspense>
        ),
        icon: <Grading className={styles.icon} />,
        needsAdmin: false,
        path: AppRoutes.gradings.toPath(),
        title: t(texts.dashboard.gradings),
      },
      {
        content: (
          <Suspense fallback={<PageSpinner />}>
            <MyProfile />
          </Suspense>
        ),
        icon: <Profile className={styles.icon} />,
        needsAdmin: false,
        path: AppRoutes.profile.toPath(),
        title: t(texts.dashboard.profile),
      },
      {
        content: (
          <Suspense fallback={<PageSpinner />}>
            <StatsSection />
          </Suspense>
        ),
        icon: <Admin className={styles.icon} />,
        needsAdmin: true,
        path: AppRoutes.stats.toPath(),
        title: t(texts.dashboard.stats),
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
    [t]
  );

  return {
    items,
  };
};
