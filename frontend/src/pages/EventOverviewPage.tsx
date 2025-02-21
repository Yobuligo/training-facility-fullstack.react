import { lazy, Suspense } from "react";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

export const EventOverviewPage: React.FC = () => {
  const EventCalendarOverview = lazy(
    () =>
      import(
        "../features/eventCalendar/eventCalendarOverview/EventCalendarOverview"
      )
  );

  return (
    <Suspense fallback={<PageSpinner />}>
      <EventCalendarOverview />
    </Suspense>
  );
};
