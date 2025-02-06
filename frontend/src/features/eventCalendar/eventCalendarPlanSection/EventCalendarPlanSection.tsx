import { Button } from "../../../components/button/Button";
import { InfoArea } from "../../../components/infoArea/InfoArea";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventDefinitionDetails } from "../../eventDefinition/eventDefinitionDetails/EventDefinitionDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import styles from "./EventCalendarPlanSection.module.scss";
import { useEventCalendarPlanSectionViewModel } from "./useEventCalendarPlanSectionViewModel";

/**
 * This component is responsible for displaying the training templates of a specific date time span (e.g. week).
 * Theses entries are used as template for the concrete training sessions.
 */
export const EventCalendarPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarPlanSectionViewModel();

  return (
    <div>
      <InfoArea text={t(texts.eventPlanSection.description)} />
      {viewModel.selectedEventDefinition ? (
        <EventDefinitionDetails
          eventDefinition={viewModel.selectedEventDefinition}
          onBack={viewModel.onBack}
          onDelete={viewModel.onDeleteEventDefinition}
          onSave={viewModel.onSaveEventDefinition}
          trainers={viewModel.trainers}
        />
      ) : (
        <div className={styles.eventCalendar}>
          <Button className={styles.button} onClick={viewModel.onAdd}>
            {t(texts.eventPlanSection.addTraining)}
          </Button>
          <EventCalendarSection
            eventDefinitionLoader={viewModel.onLoadEventDefinitions}
            onEventSelected={viewModel.onEventSelected}
            reloadSignal={viewModel.reloadSignal}
          />
        </div>
      )}
    </div>
  );
};
