import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { style } from "../../../core/ui/style";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useSession } from "../../../lib/userSession/hooks/useSession";
import { EventInfo } from "../../../services/EventInfo";
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
    const userId = checkNotNull(session).userId;
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      userId
    );

    // Render content and show register or unregister, depending on if the user is already registered or not
    return (
      <EventContent
        className={styles.eventDefinition}
        eventDefinition={event.eventDefinition}
      >
        {eventRegistration ? (
          <SpinnerButton
            className={style(styles.registerButton, styles.unregisterButton)}
            displaySpinner={viewModel.isUnregisterRequestProcessing}
            onClick={(clickEvent) => {
              viewModel.onUnregister(event);
              clickEvent.stopPropagation();
            }}
          >
            {t(texts.myTrainings.unregister)}
          </SpinnerButton>
        ) : (
          <SpinnerButton
            className={styles.registerButton}
            displaySpinner={viewModel.isRegisterRequestProcessing}
            onClick={(clickEvent) => {
              viewModel.onRegister(event);
              clickEvent.stopPropagation();
            }}
          >
            {t(texts.myTrainings.register)}
          </SpinnerButton>
        )}
      </EventContent>
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
