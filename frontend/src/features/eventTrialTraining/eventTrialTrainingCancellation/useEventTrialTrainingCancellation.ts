import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserTrialTrainingDetails } from "../../../shared/model/IUserTrialTrainingDetails";

export const useEventTrialTrainingCancellation = () => {
  const params = useParams<{ userTrialTrainingId: string }>();
  const [userTrialTrainingDetails, setUserTrialTrainingDetails] = useState<
    IUserTrialTrainingDetails | undefined
  >(undefined);
  const [
    loadUserTrialTrainingDetailsRequest,
    isLoadUserTrialTrainingDetailsRequestProcessing,
  ] = useRequest();

  useInitialize(() =>
    loadUserTrialTrainingDetailsRequest(async () => {
      const userTrialTrainingApi = new UserTrialTrainingApi();
      const userTrialTrainingDetails =
        await userTrialTrainingApi.findDetailsByIdSecured(
          checkNotNull(params.userTrialTrainingId)
        );
      setUserTrialTrainingDetails(userTrialTrainingDetails);
    })
  );

  return {
    isLoadUserTrialTrainingDetailsRequestProcessing,
    userTrialTrainingDetails,
  };
};
