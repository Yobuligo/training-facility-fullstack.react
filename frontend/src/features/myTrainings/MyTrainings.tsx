import { EventDefinitionApi } from "../../api/EventDefinitionApi";
import { Button } from "../../components/button/Button";
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
          const eventRegistration =
            event.eventDefinition.eventInstance?.eventRegistrations[0];

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
