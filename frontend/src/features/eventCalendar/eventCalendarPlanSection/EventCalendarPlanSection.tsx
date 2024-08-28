import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { Button } from "../../../components/button/Button";
import { texts } from "../../../lib/useTranslation/texts";
import { useTranslation } from "../../../lib/useTranslation/useTranslation";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import { EventDefinitionDetails } from "../../eventDefinition/eventDefinitionDetails/EventDefinitionDetails";
import styles from "./EventCalendarPlanSection.module.scss";
import { useEventCalendarPlanSectionViewModel } from "./useEventCalendarPlanSectionViewModel";

export const EventCalendarPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarPlanSectionViewModel();

  return (
    <div>
      {viewModel.selectedEventDefinition ? (
        <EventDefinitionDetails
          eventDefinition={viewModel.selectedEventDefinition}
          onBack={viewModel.onBack}
          onDelete={viewModel.onDeleteEventDefinition}
          onSave={viewModel.onSaveEventDefinition}
        />
      ) : (
        <div className={styles.eventCalendar}>
          <Button className={styles.button} onClick={viewModel.onAdd}>
            {t(texts.eventPlanSection.addTraining)}
          </Button>
          <EventCalendarSection
            eventDefinitionLoader={async (dateTimeSpan) => {
              const eventDefinitionApi = new EventDefinitionApi();
              const eventDefinitions =
                await eventDefinitionApi.findByDateTimeSpan(dateTimeSpan);
              return eventDefinitions;
            }}
            onEventSelected={viewModel.onEventSelected}
            reloadSignal={viewModel.reloadSignal}
            renderEvent={(event) => (
              <EventContent eventDefinition={event.eventDefinition} />
            )}
          />
        </div>
      )}
    </div>
  );
};
