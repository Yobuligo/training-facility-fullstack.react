import { useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isEmailInvalid } from "../../../core/utils/isEmailInvalid";
import { isError } from "../../../core/utils/isError";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useInitialize } from "../../../hooks/useInitialize";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { useTokenRequest } from "../../../hooks/useTokenRequest";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IEventTrialTrainingDetailsProps } from "./IEventTrialTrainingDetailsProps";

export const useEventTrialTrainingDetailsViewModel = (
  props: IEventTrialTrainingDetailsProps
) => {
  const { t } = useTranslation();
  const [eventInstance, setEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail, emailError, setEmailError] = useLabeledElement("");
  const [fetchEventInstanceRequest, isFetchEventInstanceRequestProcessing] =
    useTokenRequest();
  const [
    insertUserTrialTrainingRequest,
    isInsertUserTrialTrainingRequestProcessing,
  ] = useTokenRequest();
  const toast = useToast();
  const [booked, setBooked] = useState(false);

  useInitialize(() =>
    fetchEventInstanceRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstance = await eventInstanceApi.insertFromEventSecured(
        props.event
      );
      setEventInstance(eventInstance);
    })
  );

  const isFilledOut = () =>
    isNotInitial(firstname) && isNotInitial(lastname) && isNotInitial(email);

  const isValid = (): boolean => {
    let isValidState = true;

    if (isEmailInvalid(email)) {
      isValidState = false;
      setEmailError(t(texts.user.errorEmailInvalid));
    }

    return isValidState;
  };

  const onFormChange = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onSendBooking = () => {
    if (isValid()) {
      insertUserTrialTrainingRequest(
        async () => {
          const userTrialTrainingApi = new UserTrialTrainingApi();
          await userTrialTrainingApi.insertFromAttrsSecured(
            checkNotNull(eventInstance).id,
            firstname,
            lastname,
            email
          );
          setBooked(true);
        },
        (error) => {
          if (isError(error) && error.type === "UserTrialTrainingExistsError") {
            toast.error(t(texts.trialTrainingContent.errorTrialTrainingExists));
            return true;
          }
          return false;
        }
      );
    }
  };

  return {
    booked,
    email,
    emailError,
    eventInstance,
    firstname,
    lastname,
    isFetchEventInstanceRequestProcessing,
    isInsertUserTrialTrainingRequestProcessing,
    isFilledOut,
    onFormChange,
    onSendBooking,
    setEmail,
    setFirstname,
    setLastname,
  };
};
