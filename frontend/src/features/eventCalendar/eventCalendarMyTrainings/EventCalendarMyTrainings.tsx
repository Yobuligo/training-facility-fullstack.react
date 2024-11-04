import { Tooltip } from "../../../components/tooltip/Tooltip";
import { HorizontalAlignment } from "../../../core/ui/HorizontalAlignment";
import { InfoIcon } from "../../../icons/InfoIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInfo } from "../../../services/EventInfo";
import { EventRegistrationButtonContent } from "../../eventRegistration/eventRegistrationButtonContent/EventRegistrationButtonContent";
import { EventRegistrationDetails } from "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { IEvent } from "../model/IEvent";
import styles from "./EventCalendarMyTrainings.module.scss";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";

export const EventCalendarMyTrainings: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarMyTrainingsViewModel();

  const renderEvent = (event: IEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      viewModel.userId
    );

    return (
      <EventRegistrationButtonContent
        event={event}
        isRegistered={eventRegistration !== undefined}
        onRegister={() => viewModel.triggerReloadSignal()}
        onUnregister={() => viewModel.triggerReloadSignal()}
        userId={viewModel.userId}
      />
    );
  };

  return (
    <div>
      <div className={styles.infoArea}>
        <Tooltip
          align={HorizontalAlignment.LEFT}
          text={`${t(texts.eventCalendarMyTrainings.description)}${
            viewModel.showAdditionalAdminDescription
              ? t(texts.eventCalendarMyTrainings.additionalDescriptionForAdmin)
              : ""
          }`}
        >
          <InfoIcon />
        </Tooltip>
      </div>
      {viewModel.selectedEventInstance && viewModel.selectedEvent ? (
        <EventRegistrationDetails
          eventInstance={viewModel.selectedEventInstance}
          isMemberOnly={viewModel.selectedEvent.eventDefinition.isMemberOnly}
          onBack={viewModel.onEventInstanceUnselect}
          trainers={viewModel.trainers}
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
