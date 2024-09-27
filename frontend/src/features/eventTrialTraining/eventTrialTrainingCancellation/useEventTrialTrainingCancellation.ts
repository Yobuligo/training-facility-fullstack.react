import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { AppRoutes } from "../../../routes/AppRoutes";
import { IUserTrialTrainingDetails } from "../../../shared/model/IUserTrialTrainingDetails";

export const useEventTrialTrainingCancellation = () => {
  const params = useParams<{ userTrialTrainingId: string }>();
  const [userTrialTrainingDetails, setUserTrialTrainingDetails] = useState<
    IUserTrialTrainingDetails | undefined
  >(undefined);
  const navigate = useNavigate();
  const [
    loadUserTrialTrainingDetailsRequest,
    isLoadUserTrialTrainingDetailsRequestProcessing,
  ] = useRequest();
  const [
    cancelUserTrialTrainingRequest,
    isCancelUserTrialTrainingRequestProcessing,
  ] = useRequest();

  useInitialize(() =>
    loadUserTrialTrainingDetailsRequest(async () => {
      const userTrialTrainingApi = new UserTrialTrainingApi();
      const userTrialTrainingDetails =
        await userTrialTrainingApi.findDetailsByIdSecured(
          checkNotNull(params.userTrialTrainingId)
        );

      // Display error page, if userTrialTraining or corresponding event instance wasn't found
      if (!userTrialTrainingDetails) {
        return navigate(AppRoutes.error.toPath());
      }
      setUserTrialTrainingDetails(userTrialTrainingDetails);
    })
  );

  const onCancelUserTrialTraining = () =>
    cancelUserTrialTrainingRequest(async () => {});

  return {
    isCancelUserTrialTrainingRequestProcessing,
    isLoadUserTrialTrainingDetailsRequestProcessing,
    onCancelUserTrialTraining,
    userTrialTrainingDetails,
  };
};
