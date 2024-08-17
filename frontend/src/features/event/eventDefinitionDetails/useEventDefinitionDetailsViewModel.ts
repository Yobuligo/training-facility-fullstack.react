import { useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";

export const useEventDefinitionDetailsViewModel = (
  props: IEventDefinitionDetailsProps
) => {
  const [displayMode, setDisplayMode] = useState(false);
  const [description, setDescription] = useState(
    props.eventDefinition.description
  );
  const [title, setTitle] = useState(props.eventDefinition.title);
  const [fromDate, setFromDate] = useState(
    DateTime.toDate(props.eventDefinition.from)
  );
  const [fromTime, setFromTime] = useState(
    DateTime.toTime(props.eventDefinition.from)
  );
  const [toDate, setToDate] = useState(
    DateTime.toDate(props.eventDefinition.to)
  );
  const [toTime, setToTime] = useState(
    DateTime.toTime(props.eventDefinition.to)
  );
  const [recurrence, setRecurrence] = useState(
    props.eventDefinition.recurrence
  );

  const reset = () => {
    setTitle(props.eventDefinition.title);
    setDescription(props.eventDefinition.description);
    setFromDate(DateTime.toDate(props.eventDefinition.from));
    setFromTime(DateTime.toTime(props.eventDefinition.from));
    setToDate(DateTime.toDate(props.eventDefinition.to));
    setToTime(DateTime.toTime(props.eventDefinition.to));
    setRecurrence(props.eventDefinition.recurrence);
  };

  const onCancel = () => reset();

  const onSave = () => {
    props.eventDefinition.description = description;
    props.eventDefinition.from = DateTime.create(fromDate, fromTime);
    props.eventDefinition.recurrence = recurrence;
    props.eventDefinition.title = title;
    props.eventDefinition.to = DateTime.create(toDate, toTime);
    props.onSave?.(props.eventDefinition);
  };

  return {
    description,
    displayMode,
    fromDate,
    fromTime,
    onCancel,
    onSave,
    recurrence,
    setDescription,
    setDisplayMode,
    setFromDate,
    setFromTime,
    setRecurrence,
    setTitle,
    setToDate,
    setToTime,
    title,
    toDate,
    toTime,
  };
};
