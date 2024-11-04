import { Button } from "../../../components/button/Button";
import { Popover } from "../../../components/popover/Popover";
import { HorizontalAlignment } from "../../../core/ui/HorizontalAlignment";
import { InfoIcon } from "../../../icons/InfoIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventDefinitionDetails } from "../../eventDefinition/eventDefinitionDetails/EventDefinitionDetails";
import { EventCalendarSection } from "../eventCalendarSection/EventCalendarSection";
import styles from "./EventCalendarPlanSection.module.scss";
import { useEventCalendarPlanSectionViewModel } from "./useEventCalendarPlanSectionViewModel";

export const EventCalendarPlanSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useEventCalendarPlanSectionViewModel();

  return (
    <div>
      {/* <p className={styles.description}>
        {t(texts.eventPlanSection.description)}
      </p>  */}
      <div className={styles.infoArea}>
        <Popover
          align={HorizontalAlignment.LEFT}
          content={
            <p className={styles.description}>
              {t(texts.eventPlanSection.description)}
            </p>
          }
        >
          <InfoIcon />
        </Popover>
      </div>
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
