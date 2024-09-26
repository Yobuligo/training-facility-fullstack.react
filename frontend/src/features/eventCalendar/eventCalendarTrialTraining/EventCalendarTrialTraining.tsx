import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventTrialTrainingDetails } from "../../eventTrialTraining/EventTrialTrainingDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventTrialTrainingContent } from "../eventTrialTrainingContent/EventTrialTrainingContent";
import { useEventCalendarTrialTrainingViewModel } from "./useEventCalendarTrialTrainingViewModel";

/**
 * This component is responsible for displaying the events for to book a trial training.
 * This calendar has no functionality like registration or planning the trainings but a user can book a trial training.
 */
export const EventCalendarTrialTraining: React.FC = () => {
  const viewModel = useEventCalendarTrialTrainingViewModel();

  return (
    <>
      {viewModel.selectedEvent ? (
        <EventTrialTrainingDetails
          event={viewModel.selectedEvent}
          onBack={viewModel.onBack}
        />
      ) : (
        <EventCalendarSection
          eventDefinitionLoader={async () => {
            const eventDefinitionApi = new EventDefinitionApi();
            return await eventDefinitionApi.findByDateTimeSpan(
              DateTime.getWeekSpanDates(new Date())
            );
          }}
          renderEvent={(event) => (
            <EventTrialTrainingContent
              event={event}
              onBook={viewModel.onBook}
            />
          )}
          views={["day", "week"]}
        />
      )}
    </>
  );
};
