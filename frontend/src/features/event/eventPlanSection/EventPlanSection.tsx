import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DummyEventDefinition } from "../../../model/DummyEventDefinition";
import { EventCalendar } from "../eventCalendar/EventCalendar";
import { EventDefinitionDetails } from "../eventDefinitionDetails/EventDefinitionDetails";
import styles from "./EventPlanSection.module.scss";
import { useEventPlanSectionViewModel } from "./useEventPlanSectionViewModel";

export const EventPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventPlanSectionViewModel();

  return (
    <div>
      {viewModel.displayDetails ? (
        <EventDefinitionDetails
          eventDefinition={new DummyEventDefinition()}
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
            onRangeChanged={viewModel.onEventRangeChanged}
            renderEvent={(event) => <div>{event.title}</div>}
            to={new Date()}
            view="week"
          />
        </div>
      )}
    </div>
  );
};
