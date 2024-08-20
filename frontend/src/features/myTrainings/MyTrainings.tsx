import { EventDefinitionApi } from "../../api/EventDefinitionApi";
import { Button } from "../../components/button/Button";
import { NotSupportedError } from "../../core/errors/NotSupportedError";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { useSession } from "../../hooks/useSession";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { EventCalendarSection } from "../event/eventCalendarSection/EventCalendarSection";
import { EventContent } from "../event/eventContent/EventContent";
import { IMyTrainingsProps } from "./IMyTrainingsProps";
import styles from "./MyTrainings.module.scss";
import { useMyTrainingsViewModel } from "./useMyTrainingsViewModel";

export const MyTrainings: React.FC<IMyTrainingsProps> = (props) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const viewModel = useMyTrainingsViewModel(props);

  return (
    <div className={styles.myTrainings}>
      <EventCalendarSection
        eventDefinitionLoader={async (dateTimeSpan) => {
          const eventDefinitionApi = new EventDefinitionApi();
          const eventDefinitions =
            await eventDefinitionApi.findByDataTimeSpanAndUser(
              dateTimeSpan,
              checkNotNull(session).id
            );
          return eventDefinitions;
        }}
        renderEvent={(event) => {
          const eventStart = event.start;
          if (!eventStart) {
            throw new NotSupportedError();
          }

          // find event instance which belongs to the event by comparing the date
          // and return the event registration
          const eventRegistration = event.eventDefinition.eventInstances.find(
            (eventInstance) =>
              DateTime.toDate(eventInstance.from) ===
              DateTime.toDate(eventStart)
          )?.eventRegistrations[0];

          // Render if user is already registered or not
          return (
            <EventContent
              className={styles.eventContent}
              eventDefinition={event.eventDefinition}
            >
              <Button className={styles.registerButton}>
                {eventRegistration
                  ? t(texts.myTrainings.unregister)
                  : t(texts.myTrainings.register)}
              </Button>
            </EventContent>
          );
        }}
      />
    </div>
  );
};
