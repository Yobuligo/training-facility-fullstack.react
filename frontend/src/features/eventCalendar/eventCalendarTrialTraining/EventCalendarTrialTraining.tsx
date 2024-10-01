import { TokenRepository } from "../../../api/core/TokenRepository";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { requestToken } from "../../../api/utils/requestToken";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventTrialTrainingDetails } from "../../eventTrialTraining/eventTrialTraining/EventTrialTrainingDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventTrialTrainingContent } from "../eventTrialTrainingContent/EventTrialTrainingContent";
import styles from "./EventCalendarTrialTraining.module.scss";
import { useEventCalendarTrialTrainingViewModel } from "./useEventCalendarTrialTrainingViewModel";

/**
 * This component is responsible for displaying the events for to book a trial training.
 * This calendar has no functionality like registration or planning the trainings but a user can book a trial training.
 */
export const EventCalendarTrialTraining: React.FC = () => {
  const viewModel = useEventCalendarTrialTrainingViewModel();

  return (
    <div className={styles.eventCalendarTrialTraining}>
      {viewModel.eventInstance && viewModel.selectedEvent ? (
        <EventTrialTrainingDetails
          calendarEvent={viewModel.selectedEvent}
          eventInstance={viewModel.eventInstance}
          onBack={viewModel.onBack}
        />
      ) : (
        <EventCalendarSection
          eventDefinitionLoader={async () => {
            TokenRepository.token = await requestToken();
            const eventDefinitionApi = new EventDefinitionApi();
            return await eventDefinitionApi.findByDateTimeSpanSecured(
              DateTime.getWeekSpanDates(new Date())
            );
          }}
          renderEvent={(event) => (
            <EventTrialTrainingContent
              calendarEvent={event}
              onBook={viewModel.onBook}
            />
          )}
          views={["day", "week"]}
        />
      )}
    </div>
  );
};
