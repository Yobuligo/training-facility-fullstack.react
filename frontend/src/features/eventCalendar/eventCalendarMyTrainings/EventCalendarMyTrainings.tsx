import { DateTime } from "../../../core/services/date/DateTime";
import { EventInfo } from "../../../services/EventInfo";
import { EventRegistrationButton } from "../../eventRegistration/eventRegistrationButton/EventRegistrationButton";
import { EventRegistrationDetails } from "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import { IEvent } from "../model/IEvent";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";

export const EventCalendarMyTrainings: React.FC = () => {
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
