import { lazy, Suspense } from "react";
import { InfoArea } from "../../../components/infoArea/InfoArea";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInfo } from "../../../services/EventInfo";
import { EventRegistrationButtonContent } from "../../eventRegistration/eventRegistrationButtonContent/EventRegistrationButtonContent";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { IEvent } from "../model/IEvent";
import styles from "./EventCalendarMyTrainings.module.scss";
import { useEventCalendarMyTrainingsViewModel } from "./useEventCalendarMyTrainingsViewModel";

const EventRegistrationDetails = lazy(
  () =>
    import(
      "../../eventRegistration/eventRegistrationDetails/EventRegistrationDetails"
    )
);

/**
 * This component is responsible for displaying the trainings of a specific date time span (e.g. week) and the registrations of a user on these trainings.
 * In addition it is possible to display the event instance details with the required authority.
 */
export const EventCalendarMyTrainings: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarMyTrainingsViewModel();
  const screenSize = useScreenSize();

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
      <InfoArea
        className={!screenSize.isSmall() ? styles.infoArea : ""}
        text={`${t(texts.eventCalendarMyTrainings.description)}${
          viewModel.showAdditionalAdminDescription
            ? t(texts.eventCalendarMyTrainings.additionalDescriptionForAdmin)
            : ""
        }`}
      />
      {viewModel.needsDisplayLoadingSpinner ? (
        <PageSpinner />
      ) : (
        <>
          {viewModel.selectedEventInstance &&
          viewModel.selectedEventDefinition ? (
            <Suspense fallback={<PageSpinner />}>
              <EventRegistrationDetails
                eventInstance={viewModel.selectedEventInstance}
                isMemberOnly={viewModel.selectedEventDefinition.isMemberOnly}
                onBack={viewModel.onEventInstanceUnselect}
                trainers={viewModel.trainers}
              />
            </Suspense>
          ) : (
            <EventCalendarSection
              eventDefinitionLoader={viewModel.loadEventDefinitions}
              onEventSelected={viewModel.onEventSelected}
              reloadSignal={viewModel.reloadSignal}
              renderEvent={renderEvent}
            />
          )}
        </>
      )}
    </div>
  );
};
