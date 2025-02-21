import { lazy, Suspense } from "react";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

const EventCalendarOverview = lazy(
  () =>
    import(
      "../features/eventCalendar/eventCalendarOverview/EventCalendarOverview"
    )
);

export const EventOverviewPage: React.FC = () => {
  return (
    <Suspense fallback={<PageSpinner />}>
      <EventCalendarOverview />
    </Suspense>
  );
};
