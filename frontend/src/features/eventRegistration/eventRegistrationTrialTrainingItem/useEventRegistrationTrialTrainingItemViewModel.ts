import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { IEventRegistrationTrialTrainingItemProps } from "./IEventRegistrationTrialTrainingItemProps";

export const useEventRegistrationTrialTrainingItemViewModel = (
  props: IEventRegistrationTrialTrainingItemProps
) => {
  const fullName = `${props.userTrialTraining.firstname} ${props.userTrialTraining.lastname}`;
  const [updateRequest] = useRequest();

  const updateEventState = async (eventState: EventRegistrationState) => {
    updateRequest(async () => {
      props.userTrialTraining.state = eventState;
      const userTrialTrainingApi = new UserTrialTrainingApi();
      await userTrialTrainingApi.update(props.userTrialTraining);
    });
  };

  return {
    fullName,
    updateEventState,
  };
};
