import { useState } from "react";
import { ValidationError } from "../../../core/errors/ValidationError";
import { DateTime } from "../../../core/services/date/DateTime";
import { isInitial } from "../../../core/utils/isInitial";
import { useTrainerSelectOptions } from "../../../hooks/selectOptions/useTrainerSelectOptions";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { ITrainer } from "../../../shared/types/ITrainer";
import { useTrainerIds } from "../../hooks/useTrainerIds";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";

export const useEventDefinitionDetailsViewModel = (
  props: IEventDefinitionDetailsProps
) => {
  const { t } = useTranslation();
  const [displayMode, setDisplayMode] = useState(false);
  const [description, setDescription] = useState(
    props.eventDefinition.description
  );
  const [title, setTitle, titleError, setTitleError] = useLabeledElement(
    props.eventDefinition.title
  );
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
  const [isMemberOnly, setIsMemberOnly] = useState(
    props.eventDefinition.isMemberOnly
  );
  const [recurrence, setRecurrence] = useState(
    props.eventDefinition.recurrence
  );
  const [selectedColor, setSelectedColor] = useState(
    props.eventDefinition.color
  );
  const trainerSelectOptions = useTrainerSelectOptions(props.trainers);
  const [selectedTrainerIds, setSelectedTrainerIds] = useTrainerIds(
    props.eventDefinition.trainers
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
    setSelectedTrainerIds(
      props.eventDefinition.trainers?.map((trainer) => trainer.id) ?? []
    );
  };

  const onCancel = () => {
    setTitleError("");
    reset();
  };

  const onChangeTitle = (value: React.SetStateAction<string>) => {
    setTitleError("");
    setTitle(value);
  };

  const onDelete = () => props.onDelete?.(props.eventDefinition);

  const createTrainers = (): ITrainer[] => {
    const trainers: ITrainer[] = [];

    selectedTrainerIds.forEach((trainerId) => {
      const trainer = props.trainers.find(
        (trainer) => trainer.id === trainerId
      );
      if (!trainer) {
        throw new Error(
          "Error while updating trainer list. Trainer with Id not found."
        );
      }
      trainers.push({
        id: trainer.id,
        firstname: trainer.firstname,
        lastname: trainer.lastname,
      });
    });

    return trainers;
  };

  const onSave = () => {
    props.eventDefinition.description = description;
    props.eventDefinition.from = DateTime.create(fromDate, fromTime);
    props.eventDefinition.isMemberOnly = isMemberOnly;
    props.eventDefinition.recurrence = recurrence;
    props.eventDefinition.title = title;
    props.eventDefinition.to = DateTime.create(toDate, toTime);
    props.eventDefinition.color = selectedColor;
    props.eventDefinition.trainers = createTrainers();
    props.onSave?.(props.eventDefinition);
  };

  const onSelectColor = (color: string) => setSelectedColor(color);

  const onSelectedTrainerIdsChange = (trainerIds?: string[]) =>
    setSelectedTrainerIds(trainerIds ?? []);

  const onValidate = () => {
    let isValid = true;
    if (isInitial(title)) {
      isValid = false;
      setTitleError(t(texts.eventDefinitionDetails.errorEnterTitle));
    }

    if (!isValid) {
      throw new ValidationError();
    }
  };

  return {
    description,
    displayMode,
    fromDate,
    fromTime,
    isMemberOnly,
    onCancel,
    onChangeTitle,
    onDelete,
    onSave,
    onSelectColor,
    onSelectedTrainerIdsChange,
    onValidate,
    recurrence,
    selectedColor,
    selectedTrainerIds,
    setDescription,
    setDisplayMode,
    setFromDate,
    setFromTime,
    setIsMemberOnly,
    setRecurrence,
    setToDate,
    setToTime,
    title,
    titleError,
    trainerSelectOptions,
    toDate,
    toTime,
  };
};
