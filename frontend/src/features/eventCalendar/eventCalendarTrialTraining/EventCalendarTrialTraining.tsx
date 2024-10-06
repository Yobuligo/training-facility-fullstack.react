import { TokenRepository } from "../../../api/core/TokenRepository";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { requestToken } from "../../../api/utils/requestToken";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { DateTime } from "../../../core/services/date/DateTime";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventTrialTrainingDetails } from "../../eventTrialTraining/eventTrialTraining/EventTrialTrainingDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import { IEvent } from "../model/IEvent";
import styles from "./EventCalendarTrialTraining.module.scss";
import { useEventCalendarTrialTrainingViewModel } from "./useEventCalendarTrialTrainingViewModel";

/**
 * This component is responsible for displaying the events for to book a trial training.
 * This calendar has no functionality like registration or planning the trainings but a user can book a trial training.
 */
export const EventCalendarTrialTraining: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarTrialTrainingViewModel();

  const renderEvent = (event: IEvent) => (
    <EventContent>
      {event.dateTimeSpan.from && DateTime.isAfter(event.dateTimeSpan.from) && (
        <SpinnerButton
          displaySpinner={false}
          onClick={() => viewModel.onBook(event)}
        >
          {t(texts.trialTrainingContent.book)}
        </SpinnerButton>
      )}
    </EventContent>
  );

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
          eventDefinitionLoader={async (dateTimeSpan) => {
            TokenRepository.token = await requestToken();
            const eventDefinitionApi = new EventDefinitionApi();
            return await eventDefinitionApi.findByDateTimeSpanSecured(
              dateTimeSpan,
              true
            );
          }}
          renderEvent={renderEvent}
          views={["day", "week"]}
        />
      )}
    </div>
  );
};
