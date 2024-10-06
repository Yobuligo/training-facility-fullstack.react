import { DateTime } from "../../../core/services/date/DateTime";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInfo } from "../../../services/EventInfo";
import { EventRegistrationButton } from "../../eventRegistration/eventRegistrationButton/EventRegistrationButton";
import { EventRegistrationDetails } from "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import { IEvent } from "../model/IEvent";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";
import styles from "./EventCalendarMyTrainings.module.scss";

export const EventCalendarMyTrainings: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarMyTrainingsViewModel();

  const renderEvent = (event: IEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      viewModel.userId
    );

    return (
      <>
        {event.dateTimeSpan.from &&
          DateTime.isAfter(event.dateTimeSpan.from) && (
            <EventContent>
              <EventRegistrationButton
                event={event}
                isRegistered={eventRegistration !== undefined}
                onRegister={() => viewModel.triggerReloadSignal()}
                onUnregister={() => viewModel.triggerReloadSignal()}
                userId={viewModel.userId}
              />
            </EventContent>
          )}
      </>
    );
  };

  return (
    <div>
      <p className={styles.description}>{`${t(
        texts.eventCalendarMyTrainings.description
      )}${
        viewModel.showAdditionalAdminDescription
          ? t(texts.eventCalendarMyTrainings.additionalDescriptionForAdmin)
          : ""
      }`}</p>
      {viewModel.selectedEventInstance && viewModel.selectedEvent ? (
        <EventRegistrationDetails
          eventInstance={viewModel.selectedEventInstance}
          isMemberOnly={viewModel.selectedEvent.eventDefinition.isMemberOnly}
          onBack={viewModel.onEventInstanceUnselect}
        />
      ) : (
        <EventCalendarSection
          eventDefinitionLoader={viewModel.loadEventDefinitions}
          onEventSelected={viewModel.onEventSelected}
          reloadSignal={viewModel.reloadSignal}
          renderEvent={renderEvent}
        />
      )}
    </div>
  );
};
