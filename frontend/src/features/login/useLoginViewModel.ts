import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../api/UserApi";
import { useSession } from "../../hooks/useSession";
import { useToggle } from "../../hooks/useToggle";
import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../routes/AppRoutes";
import { ICredentials } from "../../shared/model/ICredentials";
import { isError } from "../../shared/utils/isError";

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMode, toggleLoginMode] = useToggle(true);
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [, setSession] = useSession();
  const navigate = useNavigate();

  const disableLoginButton = username.length === 0 || password.length === 0;

  const disablePassword = username.length === 0 && password.length === 0;

  const resetErrorMessage = () => setErrorMessage("");

  const updateErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setSuccessMessage("");
  };

  const updateSuccessMessage = (successMessage: string) => {
    setErrorMessage("");
    setSuccessMessage(successMessage);
  };

  const onConfirm = () => {
    if (loginMode) {
      onLogin();
    } else {
      onRegister();
    }
  };

  const onLogin = async () => {
    setDisplaySpinner(true);
    const credentials: ICredentials = { password, username };
    try {
      const userApi = new UserApi();
      const session = await userApi.login(credentials);
      setSession(session);
      navigate(AppRoutes.start.toPath());
    } catch (error) {
      if (isError(error)) {
        updateErrorMessage(error.message);
      } else {
        updateErrorMessage(t(texts.login.errorLogin));
      }
    }
    setDisplaySpinner(false);
  };

  const onEnter = () => {
    if (!disableLoginButton) {
      onConfirm();
    }
  };

  const onRegister = async () => {
    setDisplaySpinner(true);
    const credentials: ICredentials = { password, username };
    try {
      const userApi = new UserApi();
      await userApi.register(credentials);
      updateSuccessMessage(t(texts.login.successUserCreated));
      toggleLoginMode(true);
      setPassword("");
    } catch (error) {
      if (isError(error)) {
        updateErrorMessage(error.message);
      } else {
        updateErrorMessage(t(texts.login.errorRegister));
      }
    }
    setDisplaySpinner(false);
  };

  const onToggleLoginMode = () => {
    toggleLoginMode();
    resetErrorMessage();
  };

  return {
    disableLoginButton,
    disablePassword,
    displaySpinner,
    errorMessage,
    onConfirm,
    onEnter,
    onToggleLoginMode,
    setPassword,
    setUsername,
    loginMode,
    password,
    successMessage,
    username,
  };
};
