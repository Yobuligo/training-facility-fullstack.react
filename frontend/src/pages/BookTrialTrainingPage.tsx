import { lazy, Suspense } from "react";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

export const BookTrialTrainingPage: React.FC = () => {
  const EventCalendarTrialTraining = lazy(
    () =>
      import(
        "../features/eventCalendar/eventCalendarTrialTraining/EventCalendarTrialTraining"
      )
  );
  return (
    <Suspense fallback={<PageSpinner />}>
      <EventCalendarTrialTraining />
    </Suspense>
  );
};
