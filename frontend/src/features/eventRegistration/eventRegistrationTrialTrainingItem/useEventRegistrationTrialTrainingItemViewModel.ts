import { useMemo } from "react";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyUserProfile } from "../../../model/DummyUserProfile";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { IEventRegistrationTrialTrainingItemProps } from "./IEventRegistrationTrialTrainingItemProps";

export const useEventRegistrationTrialTrainingItemViewModel = (
  props: IEventRegistrationTrialTrainingItemProps
) => {
  const [updateRequest] = useRequest();

  const userProfileDummy = useMemo(() => {
    const userProfileDummy = new DummyUserProfile();
    userProfileDummy.firstname = props.userTrialTraining.firstname;
    userProfileDummy.lastname = props.userTrialTraining.lastname;
    userProfileDummy.email = props.userTrialTraining.email;
    return userProfileDummy;
  }, [
    props.userTrialTraining.email,
    props.userTrialTraining.firstname,
    props.userTrialTraining.lastname,
  ]);

  const updateEventState = async (eventState: EventRegistrationState) => {
    updateRequest(async () => {
      props.userTrialTraining.state = eventState;
      const userTrialTrainingApi = new UserTrialTrainingApi();
      await userTrialTrainingApi.update(props.userTrialTraining);
    });
  };

  return {
    updateEventState,
    userProfileDummy,
  };
};
