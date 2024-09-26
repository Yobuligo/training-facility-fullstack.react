import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventTrialTrainingContent } from "../eventTrialTrainingContent/EventTrialTrainingContent";

/**
 * This component is responsible for displaying the events for to book a trial training.
 * This calendar has no functionality like registration or planning the trainings but a user can book a trial training.
 */
export const EventCalendarTrialTraining: React.FC = () => {

  return (
    <EventCalendarSection
      eventDefinitionLoader={async () => {
        const eventDefinitionApi = new EventDefinitionApi();
        return await eventDefinitionApi.findByDateTimeSpan(
          DateTime.getWeekSpanDates(new Date())
        );
      }}
      renderEvent={(event) => (
        <EventTrialTrainingContent eventDefinition={event.eventDefinition} />
      )}
      views={["day", "week"]}
    />
  );
};
