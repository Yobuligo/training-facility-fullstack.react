import { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { AppRoutes } from "../../../routes/AppRoutes";
import { EventCalendarMyTrainings } from "../../eventCalendar/eventCalendarMyTrainings/EventCalendarMyTrainings";
import { EventCalendarPlanSection } from "../../eventCalendar/eventCalendarPlanSection/EventCalendarPlanSection";
import { MyGradingList } from "../../grading/myGradingList/MyGradingList";
import { MyProfile } from "../../myProfile/MyProfile";
import { UserProfileSection } from "../../users/userProfileSection/UserProfileSection";
import { Welcome } from "../../welcome/Welcome";

export const useDashboardContentViewModel = () => {
  const params = useParams<{ itemId: string }>();

  const getContent = (): ReactNode => {
    const path = params.itemId ? `/${params.itemId}` : "/";
    switch (path) {
      case AppRoutes.dashboard.toPath(): {
        return <Welcome />;
      }
      case AppRoutes.users.toPath(): {
        return <UserProfileSection />;
      }
      case AppRoutes.planers.toPath(): {
        return <EventCalendarPlanSection />;
      }
      case AppRoutes.trainings.toPath(): {
        return <EventCalendarMyTrainings />;
      }
      case AppRoutes.gradings.toPath(): {
        return <MyGradingList />;
      }
      case AppRoutes.profile.toPath(): {
        return <MyProfile />;
      }
      default: {
        // Todo: check for invalid tab
      }
    }
  };

  return {
    getContent,
  };
};
