import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isError } from "../../core/utils/isError";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { AppRoutes } from "../../routes/AppRoutes";

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const navigate = useNavigate();

  const disableLoginButton = username.length === 0 || password.length === 0;

  const disablePassword = username.length === 0 && password.length === 0;

  const updateErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setSuccessMessage("");
  };

  const handleError = (error: any) => {
    if (isError(error) && error.type === "InvalidCredentialsError") {
      updateErrorMessage(t(texts.login.errorInvalidCredentials));
    } else if (isError(error) && error.type === "LoginNotPossibleError") {
      updateErrorMessage(t(texts.login.errorLoginNotPossible));
    } else {
      updateErrorMessage(t(texts.login.errorLogin));
    }
  };

  const onLogin = async () => {
    setDisplaySpinner(true);
    try {
      const userApi = new UserApi();
      await userApi.login(username, password);
      navigate(AppRoutes.dashboard.toPath());
    } catch (error) {
      handleError(error);
    }
    setDisplaySpinner(false);
  };

  const onEnter = () => {
    if (!disableLoginButton) {
      onLogin();
    }
  };

  return {
    disableLoginButton,
    disablePassword,
    displaySpinner,
    errorMessage,
    onLogin,
    onEnter,
    setPassword,
    setUsername,
    password,
    successMessage,
    username,
  };
};
