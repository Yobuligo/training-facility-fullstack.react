import { useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { isInitial } from "../../../core/utils/isInitial";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";

export const useEventDefinitionDetailsViewModel = (
  props: IEventDefinitionDetailsProps
) => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
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
  const [selectedColor, setSelectedColor] = useState(
    props.eventDefinition.color
  );

  const reset = () => {
    setTitle(props.eventDefinition.title);
    setDescription(props.eventDefinition.description);
    setFromDate(DateTime.toDate(props.eventDefinition.from));
    setFromTime(DateTime.toTime(props.eventDefinition.from));
    setToDate(DateTime.toDate(props.eventDefinition.to));
    setToTime(DateTime.toTime(props.eventDefinition.to));
    setRecurrence(props.eventDefinition.recurrence);
    setSelectedColor(props.eventDefinition.color);
  };

  const onCancel = () => {
    setError("");
    reset();
  };

  const onChangeTitle = (value: React.SetStateAction<string>) => {
    setError("");
    setTitle(value);
  };

  const onDelete = () => props.onDelete?.(props.eventDefinition);

  const onSave = () => {
    props.eventDefinition.description = description;
    props.eventDefinition.from = DateTime.create(fromDate, fromTime);
    props.eventDefinition.recurrence = recurrence;
    props.eventDefinition.title = title;
    props.eventDefinition.to = DateTime.create(toDate, toTime);
    props.eventDefinition.color = selectedColor;
    props.onSave?.(props.eventDefinition);
  };

  const onSelectColor = (color: string) => setSelectedColor(color);

  const onValidate = () => {
    if (isInitial(title)) {
      setError(t(texts.eventDefinitionDetails.enterTitle));
      throw new Error();
    }
  };

  return {
    description,
    displayMode,
    error,
    fromDate,
    fromTime,
    onCancel,
    onChangeTitle,
    onDelete,
    onSave,
    onSelectColor,
    onValidate,
    recurrence,
    selectedColor,
    setDescription,
    setDisplayMode,
    setFromDate,
    setFromTime,
    setRecurrence,
    setToDate,
    setToTime,
    title,
    toDate,
    toTime,
  };
};