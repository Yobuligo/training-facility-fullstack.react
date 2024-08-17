import { useState } from "react";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";

export const useEventDefinitionDetailsViewModel = (
  props: IEventDefinitionDetailsProps
) => {
  const [displayMode, setDisplayMode] = useState(false);
  const [description, setDescription] = useState(
    props.eventDefinition.description
  );
  const [title, setTitle] = useState(props.eventDefinition.title);

  const [from, setFrom] = useState(props.eventDefinition.from);
  const [to, setTo] = useState(props.eventDefinition.to);
  const [recurrence, setRecurrence] = useState(
    props.eventDefinition.recurrence
  );

  const reset = () => {
    setTitle(props.eventDefinition.title);
    setDescription(props.eventDefinition.description);
    setFrom(props.eventDefinition.from);
    setTo(props.eventDefinition.to);
    setRecurrence(props.eventDefinition.recurrence);
  };

  const onCancel = () => reset();

  const onSave = () => {
    props.eventDefinition.description = description;
    props.eventDefinition.from = from;
    props.eventDefinition.recurrence = recurrence;
    props.eventDefinition.title = title;
    props.eventDefinition.to = to;
    props.onSave?.(props.eventDefinition);
  };

  return {
    description,
    displayMode,
    from,
    onCancel,
    onSave,
    recurrence,
    setDescription,
    setDisplayMode,
    setFrom,
    setRecurrence,
    setTitle,
    setTo,
    title,
    to,
  };
};
