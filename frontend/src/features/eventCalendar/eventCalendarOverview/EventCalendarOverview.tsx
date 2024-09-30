import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { requestToken } from "../../../api/utils/requestToken";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import styles from "./EventCalendarOverview.module.scss";

/**
 * This component is responsible for displaying the events for the current week as calendar.
 * This calendar has no functionality like registration or planning the trainings.
 */
export const EventCalendarOverview: React.FC = () => {
  return (
    <div className={styles.eventCalendarOverview}>
      <EventCalendarSection
        eventDefinitionLoader={async () => {
          const token = await requestToken();
          const eventDefinitionApi = new EventDefinitionApi();
          return await eventDefinitionApi.findByDateTimeSpanSecured(
            DateTime.getWeekSpanDates(new Date()),
            token
          );
        }}
        renderEvent={(event) => (
          <EventContent eventDefinition={event.eventDefinition} />
        )}
        views={["day", "week"]}
      />
    </div>
  );
};
