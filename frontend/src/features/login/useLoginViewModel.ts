import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isError } from "../../core/utils/isError";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { SessionRepo } from "../../lib/userSession/api/SessionRepo";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { useSession } from "../../lib/userSession/hooks/useSession";
import { AppRoutes } from "../../routes/AppRoutes";

export const useLoginViewModel = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [, setSession] = useSession();
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
    } else {
      updateErrorMessage(t(texts.login.errorLogin));
    }
  };

  const onLogin = async () => {
    setDisplaySpinner(true);
    try {
      const userApi = new UserApi();
      const session = await userApi.login(username, password);
      setSession(session);
      SessionRepo.instance.setSession(session);
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
