import { lazy, Suspense } from "react";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

const EventCalendarTrialTraining = lazy(
  () =>
    import(
      "../features/eventCalendar/eventCalendarTrialTraining/EventCalendarTrialTraining"
    )
);

export const BookTrialTrainingPage: React.FC = () => {
  return (
    <Suspense fallback={<PageSpinner />}>
      <EventCalendarTrialTraining />
    </Suspense>
  );
};
