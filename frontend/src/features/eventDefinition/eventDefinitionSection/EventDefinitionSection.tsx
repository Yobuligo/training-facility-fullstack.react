import { DateTimeSpanFilter } from "../../../components/dateTimeSpanFilter/DateTimeSpanFilter";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventDefinitionList } from "../eventDefinitionList/EventDefinitionList";
import styles from "./EventDefinitionSection.module.scss";
import { IEventDefinitionSectionProps } from "./IEventDefinitionSectionProps";

export const EventDefinitionSection: React.FC<IEventDefinitionSectionProps> = (
  props
) => {
  return (
    <div className={styles.eventDefinitionSection}>
      <DateTimeSpanFilter
        fromDate={DateTime.getWeekStartDate(new Date())}
        toDate={DateTime.getWeekEndDate(new Date())}
      />

      <EventDefinitionList eventDefinitions={props.eventDefinitions} />
    </div>
  );
};
