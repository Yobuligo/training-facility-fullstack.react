import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

export const useEventRegistrationItemViewModel = (
  props: IEventRegistrationItemProps
) => {
  const { t } = useTranslation();
  const [updateRequest] = useRequest();

  const toggleButtonOptions: IToggleButtonOption<EventRegistrationState>[] = [
    {
      key: EventRegistrationState.MISSING,
      text: t(texts.eventRegistrationItem.missing),
    },
    {
      key: EventRegistrationState.PRESENT,
      text: t(texts.eventRegistrationItem.present),
    },
  ];

  const selectedToggleButtonOption = toggleButtonOptions.find(
    (toggleButtonOption) =>
      toggleButtonOption.key === props.eventRegistration.state
  );

  const updateEventState = async (eventState: EventRegistrationState) => {
    updateRequest(async () => {
      props.eventRegistration.state = eventState;
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.update(props.eventRegistration);
    });
  };

  const onToggleButtonOptionChange = (
    selected: IToggleButtonOption<EventRegistrationState> | undefined
  ) => {
    // if no toggle button option is selected, return to open state
    // otherwise the selected state
    if (selected === undefined) {
      updateEventState(EventRegistrationState.OPEN);
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
