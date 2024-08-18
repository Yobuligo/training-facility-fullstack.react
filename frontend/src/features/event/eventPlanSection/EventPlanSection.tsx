import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventCalendar } from "../eventCalendar/EventCalendar";
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
          onSave={viewModel.onSaveEventDefinition}
        />
      ) : (
        <div className={styles.eventCalendar}>
          <Button className={styles.button} onClick={viewModel.onAdd}>
            {t(texts.EventPlanSection.addTraining)}
          </Button>
          <EventCalendar
            events={viewModel.events}
            from={new Date()}
            onSelect={viewModel.onEventSelected}
            onRangeChanged={viewModel.onEventRangeChanged}
            renderEvent={(event) => (
              <EventContent eventDefinition={event.eventDefinition} />
            )}
            to={new Date()}
            view="week"
          />
        </div>
      )}
    </div>
  );
};
