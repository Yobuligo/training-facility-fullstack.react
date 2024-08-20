import { EventDefinitionApi } from "../../api/EventDefinitionApi";
import { Button } from "../../components/button/Button";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { useSession } from "../../hooks/useSession";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { EventInfo } from "../../services/EventInfo";
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
          const eventRegistration = EventInfo.findFirstEventRegistration(event);

          // Render content and show register or unregister, depending on if the user is already registered or not
          return (
            <EventContent
              className={styles.eventContent}
              eventDefinition={event.eventDefinition}
            >
              {eventRegistration ? (
                <Button
                  className={styles.registerButton}
                  onClick={() => viewModel.onRegister(event)}
                >
                  {t(texts.myTrainings.unregister)}
                </Button>
              ) : (
                <Button
                  className={styles.registerButton}
                  onClick={() => viewModel.onUnregister(event)}
                >
                  {t(texts.myTrainings.unregister)}
                </Button>
              )}
            </EventContent>
          );
        }}
      />
    </div>
  );
};
