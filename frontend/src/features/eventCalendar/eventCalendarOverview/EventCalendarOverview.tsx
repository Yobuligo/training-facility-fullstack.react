import { TokenRepository } from "../../../api/core/TokenRepository";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { requestToken } from "../../../api/utils/requestToken";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import styles from "./EventCalendarOverview.module.scss";

/**
 * This component is responsible for displaying the events for the current week as calendar.
 * This calendar has no functionality like registration or planning the trainings.
 */
export const EventCalendarOverview: React.FC = () => {
  return (
    <div className={styles.eventCalendarOverview}>
      <EventCalendarSection
        eventDefinitionLoader={async (dateTimeSpan) => {
          TokenRepository.token = await requestToken();
          const eventDefinitionApi = new EventDefinitionApi();
          return await eventDefinitionApi.findByDateTimeSpanSecured(
            dateTimeSpan,
            true
          );
        }}
        views={["day", "week"]}
      />
    </div>
  );
};
