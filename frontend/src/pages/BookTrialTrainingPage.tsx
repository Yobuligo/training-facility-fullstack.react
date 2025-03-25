import { lazy } from "react";
import { PublicPage } from "../components/pages/publicPage/PublicPage";

const EventCalendarTrialTraining = lazy(
  () =>
    import(
      "../features/eventCalendar/eventCalendarTrialTraining/EventCalendarTrialTraining"
    )
);

export const BookTrialTrainingPage: React.FC = () => {
  return (
    <PublicPage>
      <EventCalendarTrialTraining />
    </PublicPage>
  );
};
