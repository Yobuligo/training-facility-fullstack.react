import { useState } from "react";
import { isEmailInvalid } from "../../core/utils/isEmailInvalid";
import { isNotInitial } from "../../core/utils/isNotInitial";
import { useLabeledElement } from "../../hooks/useLabeledElement";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IEventTrialTrainingDetailsProps } from "./IEventTrialTrainingDetailsProps";

export const useEventTrialTrainingDetailsViewModel = (
  props: IEventTrialTrainingDetailsProps
) => {
  const { t } = useTranslation();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail, emailError, setEmailError] = useLabeledElement("");

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
    firstname,
    lastname,
    isFilledOut,
    onFormChange,
    onSendBooking,
    setEmail,
    setFirstname,
    setLastname,
  };
};
