import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { useRequest } from "../../../hooks/useRequest";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventState } from "../../../shared/types/EventState";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

export const useEventRegistrationItemViewModel = (
  props: IEventRegistrationItemProps
) => {
  const { t } = useTranslation();
  const updateRequest = useRequest();

  // useEffect(() => {}, [props.eventRegistration.eventState]);

  const toggleButtonOptions: IToggleButtonOption<EventState>[] = [
    { key: EventState.MISSING, text: t(texts.eventRegistrationItem.missing) },
    { key: EventState.PRESENT, text: t(texts.eventRegistrationItem.present) },
  ];

  const selectedToggleButtonOption = toggleButtonOptions.find(
    (toggleButtonOption) =>
      toggleButtonOption.key === props.eventRegistration.eventState
  );

  const updateEventState = async (eventState: EventState) => {
    updateRequest.send(async () => {
      props.eventRegistration.eventState = eventState;
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.update(props.eventRegistration);
    });
  };

  const onToggleButtonOptionChange = (
    selected: IToggleButtonOption<EventState> | undefined
  ) => {
    // if no toggle button option is selected, return to open state
    // otherwise the selected state
    if (selected === undefined) {
      updateEventState(EventState.OPEN);
    } else {
      updateEventState(selected.key);
    }
  };

  const onDelete = () => props.onDelete?.(props.eventRegistration);

  return {
    onDelete,
    onToggleButtonOptionChange,
    selectedToggleButtonOption,
    toggleButtonOptions,
  };
};
