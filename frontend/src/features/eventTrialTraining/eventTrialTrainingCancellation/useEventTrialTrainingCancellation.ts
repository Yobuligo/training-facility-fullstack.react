import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isError } from "../../../core/utils/isError";
import { useInitialize } from "../../../hooks/useInitialize";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserTrialTrainingDetails } from "../../../shared/model/IUserTrialTrainingDetails";

export const useEventTrialTrainingCancellation = () => {
  const { t } = useTranslation();
  const params = useParams<{ userTrialTrainingId: string }>();
  const [userTrialTrainingDetails, setUserTrialTrainingDetails] = useState<
    IUserTrialTrainingDetails | undefined
  >(undefined);
  const toast = useToast();
  const [
    loadUserTrialTrainingDetailsRequest,
    isLoadUserTrialTrainingDetailsRequestProcessing,
  ] = useRequest();
  const [
    cancelUserTrialTrainingRequest,
    isCancelUserTrialTrainingRequestProcessing,
  ] = useRequest();
  const [wasDeleted, setWasDeleted] = useState(false);

  useInitialize(() =>
    loadUserTrialTrainingDetailsRequest(
      async () => {
        const userTrialTrainingApi = new UserTrialTrainingApi();
        const userTrialTrainingDetails =
          await userTrialTrainingApi.findDetailsByIdSecured(
            checkNotNull(params.userTrialTrainingId)
          );

        // Display error page, if userTrialTraining or corresponding event instance wasn't found
        if (!userTrialTrainingDetails) {
          toast.error(t(texts.eventTrialTrainingCancellation.notFound));
        } else {
          setUserTrialTrainingDetails(userTrialTrainingDetails);
        }
      },
      (error) => {
        if (isError(error) && error.type === "NotFoundError") {
          toast.error(t(texts.eventTrialTrainingCancellation.notFound));
          return true;
        }
        return false;
      }
    )
  );

  const onCancelUserTrialTraining = () =>
    cancelUserTrialTrainingRequest(async () => {
      const useTrialTrainingApi = new UserTrialTrainingApi();
      await useTrialTrainingApi.deleteByIdSecured(
        checkNotNull(userTrialTrainingDetails).id
      );
      setWasDeleted(true);
    });

  return {
    wasDeleted,
    isCancelUserTrialTrainingRequestProcessing,
    isLoadUserTrialTrainingDetailsRequestProcessing,
    onCancelUserTrialTraining,
    userTrialTrainingDetails,
  };
};
