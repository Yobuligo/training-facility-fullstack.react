import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import { EventContent } from "../eventContent/EventContent";
import { EventDefinitionDetails } from "../eventDefinitionDetails/EventDefinitionDetails";
import styles from "./EventPlanSection.module.scss";
import { useEventPlanSectionViewModel } from "./useEventPlanSectionViewModel";

export const EventPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventPlanSectionViewModel();

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
            {t(texts.EventPlanSection.addTraining)}
          </Button>
          <EventCalendarSection
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
