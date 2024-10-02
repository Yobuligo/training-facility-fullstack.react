import { DateTimeSpanFilter } from "../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
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
      <DateTimeSpanFilter
        fromDate={viewModel.from}
        toDate={viewModel.to}
        onChange={viewModel.onDateTimeSpanChanged}
      />
      {props.isEventDefinitionsLoading ? (
        <PageSpinner />
      ) : (
        <EventDefinitionList
          events={props.events}
          onSelect={props.onSelect}
          renderEvent={props.renderEvent}
        />
      )}
    </div>
  );
};
