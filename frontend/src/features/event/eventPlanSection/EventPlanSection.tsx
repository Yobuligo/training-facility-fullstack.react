import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventCalendar } from "../eventCalendar/EventCalendar";
import { EventContent } from "../eventContent/EventContent";
import { EventDefinitionDetails } from "../eventDefinitionDetails/EventDefinitionDetails";
import styles from "./EventPlanSection.module.scss";
import { IEvent } from "./IEvent";
import { useEventPlanSectionViewModel } from "./useEventPlanSectionViewModel";

export const EventPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventPlanSectionViewModel();

  const styleEvent = (event: IEvent) => {
    return {
      backgroundColor: event.eventDefinition.color,
      padding: "0.5rem",
    };
  };

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
            onViewChanged={viewModel.onViewChanged}
            renderEvent={(event) => (
              <EventContent eventDefinition={event.eventDefinition} />
            )}
            styleEvent={styleEvent}
            to={new Date()}
            view={viewModel.view}
          />
        </div>
      )}
    </div>
  );
};
