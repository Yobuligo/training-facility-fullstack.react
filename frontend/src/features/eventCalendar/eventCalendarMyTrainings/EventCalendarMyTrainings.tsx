import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { Button } from "../../../components/button/Button";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useSession } from "../../../hooks/useSession";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventInstanceFactory } from "../../../services/EventInstanceFactory";
import { EventInfo } from "../../../services/EventInfo";
import { style } from "../../../utils/style";
import { EventRegistrationDetails } from "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import { IEvent } from "../model/IEvent";
import styles from "./EventCalendarMyTrainings.module.scss";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";

export const EventCalendarMyTrainings: React.FC = () => {
  const { t } = useTranslation();
  const [session] = useSession();
  const viewModel = useEventCalendarMyTrainingsViewModel();

  const renderEvent = (event: IEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistration(event);

    // Render content and show register or unregister, depending on if the user is already registered or not
    return (
      <EventContent
        className={styles.eventDefinition}
        eventDefinition={event.eventDefinition}
      >
        {eventRegistration ? (
          <Button
            className={style(styles.registerButton, styles.unregisterButton)}
            onClick={(clickEvent) => {
              viewModel.onUnregister(event);
              clickEvent.stopPropagation();
            }}
          >
            {t(texts.myTrainings.unregister)}
          </Button>
        ) : (
          <Button
            className={styles.registerButton}
            onClick={(clickEvent) => {
              viewModel.onRegister(event);
              clickEvent.stopPropagation();
            }}
          >
            {t(texts.myTrainings.register)}
          </Button>
        )}
      </EventContent>
    );
  };

  return (
    <div>
      {viewModel.selectedEvent ? (
        <EventRegistrationDetails
          eventInstance={
            EventInfo.findEventInstance(viewModel.selectedEvent) ??
            new EventInstanceFactory().createFromEvent(viewModel.selectedEvent)
          }
          onBack={viewModel.onEventInstanceUnselect}
        />
      ) : (
        <EventCalendarSection
          eventDefinitionLoader={async (dateTimeSpan) => {
            const eventDefinitionApi = new EventDefinitionApi();
            const eventDefinitions =
              await eventDefinitionApi.findByDataTimeSpanAndUser(
                dateTimeSpan,
                checkNotNull(session).userId
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
