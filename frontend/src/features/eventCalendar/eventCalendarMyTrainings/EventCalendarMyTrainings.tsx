import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { EventInfo } from "../../../services/EventInfo";
import { EventRegistrationDetails } from "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventMyTrainingsContent } from "../eventMyTrainingsContent/EventMyTrainingsContent";
import { IEvent } from "../model/IEvent";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";

export const EventCalendarMyTrainings: React.FC = () => {
  const viewModel = useEventCalendarMyTrainingsViewModel();

  const renderEvent = (event: IEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      viewModel.userId
    );

    // Render content and show register or unregister, depending on if the user is already registered or not
    return (
      <EventMyTrainingsContent
        event={event}
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
        <EventCalendarSection
          eventDefinitionLoader={async (dateTimeSpan) => {
            const eventDefinitionApi = new EventDefinitionApi();
            const eventDefinitions =
              await eventDefinitionApi.findByDataTimeSpanAndUser(
                dateTimeSpan,
                viewModel.userId
              );
            return eventDefinitions;
          }}
          onEventSelected={viewModel.onEventSelected}
          reloadSignal={viewModel.reloadSignal}
          renderEvent={renderEvent}
        />
      )}
    </div>
  );
};
