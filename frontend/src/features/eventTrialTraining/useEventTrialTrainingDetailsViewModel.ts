import { useState } from "react";
import { EventInstanceApi } from "../../api/EventInstanceApi";
import { isEmailInvalid } from "../../core/utils/isEmailInvalid";
import { isNotInitial } from "../../core/utils/isNotInitial";
import { useInitialize } from "../../hooks/useInitialize";
import { useLabeledElement } from "../../hooks/useLabeledElement";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IEventInstance } from "../../shared/model/IEventInstance";
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
    useRequest();

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
      props.onSendBooking?.();
    }
  };

  return {
    email,
    emailError,
    eventInstance,
    firstname,
    lastname,
    isFetchEventInstanceRequestProcessing,
    isFilledOut,
    onFormChange,
    onSendBooking,
    setEmail,
    setFirstname,
    setLastname,
  };
};
