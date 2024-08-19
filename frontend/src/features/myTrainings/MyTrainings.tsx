import { EventDefinitionApi } from "../../api/EventDefinitionApi";
import { Button } from "../../components/button/Button";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { EventCalendarSection } from "../event/eventCalendarSection/EventCalendarSection";
import { EventContent } from "../event/eventContent/EventContent";
import { IMyTrainingsProps } from "./IMyTrainingsProps";
import styles from "./MyTrainings.module.scss";
import { useMyTrainingsViewModel } from "./useMyTrainingsViewModel";

export const MyTrainings: React.FC<IMyTrainingsProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useMyTrainingsViewModel(props);

  return (
    <div className={styles.myTrainings}>
      <EventCalendarSection
        eventDefinitionLoader={async (dateTimeSpan) => {
          const eventDefinitionApi = new EventDefinitionApi();
          const eventDefinitions = await eventDefinitionApi.findByDateTimeSpan(
            dateTimeSpan
          );
          return eventDefinitions;
        }}
        renderEvent={(event) => (
          <EventContent
            className={styles.eventContent}
            eventDefinition={event.eventDefinition}
          >
            <Button
              className={styles.registerButton}
              onClick={viewModel.onToggleRegister}
            >
              {viewModel.registered
                ? t(texts.myTrainings.unregister)
                : t(texts.myTrainings.register)}
            </Button>
          </EventContent>
        )}
      />
    </div>
  );
};
