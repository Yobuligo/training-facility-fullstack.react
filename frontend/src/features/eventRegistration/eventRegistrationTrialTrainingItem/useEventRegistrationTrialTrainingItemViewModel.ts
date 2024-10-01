import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { IToggleButtonOption } from "../../../components/toggleButtonGroup/IToggleButtonOption";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { IEventRegistrationTrialTrainingItemProps } from "./IEventRegistrationTrialTrainingItemProps";

export const useEventRegistrationTrialTrainingItemViewModel = (
  props: IEventRegistrationTrialTrainingItemProps
) => {
  const { t } = useTranslation();
  const fullName = `${props.userTrialTraining.firstname} ${props.userTrialTraining.lastname}`;
  const [updateRequest] = useRequest();

  const updateEventState = async (eventState: EventRegistrationState) => {
    updateRequest(async () => {
      props.userTrialTraining.state = eventState;
      const userTrialTrainingApi = new UserTrialTrainingApi();
      await userTrialTrainingApi.update(props.userTrialTraining);
    });
  };

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
      toggleButtonOption.key === props.userTrialTraining.state
  );

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

  return {
    fullName,
    onToggleButtonOptionChange,
    selectedToggleButtonOption,
    toggleButtonOptions,
  };
};
