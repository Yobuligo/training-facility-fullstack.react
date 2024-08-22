import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";

/**
 * This component is responsible for displaying the events for the current week as calendar.
 * This calendar has no functionality like registration or planning the trainings.
 */
export const EventCalendarOverview: React.FC = () => {
  return (
    <EventCalendarSection
      eventDefinitionLoader={async () => {
        const eventDefinitionApi = new EventDefinitionApi();
        return await eventDefinitionApi.findByDateTimeSpan(
          DateTime.getWeekSpanDates(new Date())
        );
      }}
      renderEvent={(event) => (
        <EventContent eventDefinition={event.eventDefinition} />
      )}
      views={["day", "week"]}
    />
  );
};
