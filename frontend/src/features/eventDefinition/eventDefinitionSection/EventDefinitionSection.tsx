import { DateTimeSpanFilter } from "../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { EventDefinitionList } from "../eventDefinitionList/EventDefinitionList";
import styles from "./EventDefinitionSection.module.scss";
import { IEventDefinitionSectionProps } from "./IEventDefinitionSectionProps";
import { useEventDefinitionSectionViewModel } from "./useEventDefinitionSectionViewModel";

export const EventDefinitionSection: React.FC<IEventDefinitionSectionProps> = (
  props
) => {
  const viewModel = useEventDefinitionSectionViewModel(props);

  return (
    <div className={styles.eventDefinitionSection}>
      <DateTimeSpanFilter fromDate={viewModel.from} toDate={viewModel.to} />
      <EventDefinitionList events={viewModel.events} userId={props.userId} />
    </div>
  );
};
