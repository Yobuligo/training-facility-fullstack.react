import { EventInfo } from "../../../services/EventInfo";
import { EventDefinitionSection } from "../../eventDefinition/eventDefinitionSection/EventDefinitionSection";
import { EventRegistrationDetails } from "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventMyTrainingsContent } from "../eventMyTrainingsContent/EventMyTrainingsContent";
import { ICalendarEvent } from "../model/ICalendarEvent";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";

export const EventCalendarMyTrainings: React.FC = () => {
  const viewModel = useEventCalendarMyTrainingsViewModel();

  const renderEvent = (calendarEvent: ICalendarEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      calendarEvent,
      viewModel.userId
    );

    // Render content and show register or unregister, depending on if the user is already registered or not
    return (
      <EventMyTrainingsContent
        calendarEvent={calendarEvent}
        isRegistered={eventRegistration !== undefined}
        userId={viewModel.userId}
        onRegister={() => viewModel.triggerReloadSignal()}
        onUnregister={() => viewModel.triggerReloadSignal()}
      />
    );
  };

  return (
    <div>
      {viewModel.selectedEventInstance ? (
        <EventRegistrationDetails
          eventInstance={viewModel.selectedEventInstance}
          onBack={viewModel.onEventInstanceUnselect}
        />
      ) : (
        <>
          <EventDefinitionSection
            eventDefinitions={viewModel.eventDefinitions}
            onReload={viewModel.onReload}
            userId={viewModel.userId}
          />

          <EventCalendarSection
            eventDefinitionLoader={viewModel.loadEventDefinitions}
            onEventSelected={viewModel.onEventSelected}
            reloadSignal={viewModel.reloadSignal}
            renderEvent={renderEvent}
          />
        </>
      )}
    </div>
  );
};
