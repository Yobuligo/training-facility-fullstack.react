import { useEffect, useState } from "react";
import { TokenRepository } from "../../../api/core/TokenRepository";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { requestToken } from "../../../api/utils/requestToken";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { useDateTimeSpanFilter } from "../../../hooks/useDateTimeSpanFilter";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import styles from "./EventCalendarOverview.module.scss";

/**
 * This component is responsible for displaying the events for the current week as calendar.
 * This calendar has no functionality like registration or planning the trainings.
 */
const EventCalendarOverview: React.FC = () => {
  const [, , updateView] = useDateTimeSpanFilter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      // The event calendar overview should always display all events of the week
      updateView("week");
      setInitialized(true);
    }
  }, [initialized, updateView]);

  return (
    <div className={styles.eventCalendarOverview}>
      {initialized === false ? (
        <PageSpinner />
      ) : (
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
      )}
    </div>
  );
};

export default EventCalendarOverview;
