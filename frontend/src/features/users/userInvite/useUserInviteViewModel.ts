import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserInviteApi } from "../../../api/UserInviteApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isError } from "../../../core/utils/isError";
import { isInitial } from "../../../core/utils/isInitial";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useInitialize } from "../../../hooks/useInitialize";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { useTokenRequest } from "../../../hooks/useTokenRequest";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { IUserInviteShort } from "../../../shared/model/IUserInviteShort";

export const useUserInviteViewModel = () => {
  const params = useParams<{ userInviteId: string }>();
  const { t } = useTranslation();
  const [verifyUserInviteRequest, isVerifyUserInviteRequestProcessing] =
    useTokenRequest();
  const [changePasswordRequest, isChangePasswordRequestProcessing] =
    useTokenRequest();
  const [userInvite, setUserInvite] = useState<IUserInviteShort | undefined>(
    undefined
  );
  const [error, setError] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  const newPassword = useLabeledElement("");
  const newConfirmPassword = useLabeledElement("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleError = (error: any): boolean => {
    if (isError(error)) {
      switch (error.type) {
        case "ExpiredError": {
          setError(t(texts.userInvite.errorInviteExpiredOrInvalid));
          return true;
        }
        case "NotFoundError": {
          setError(t(texts.userInvite.errorInviteExpiredOrInvalid));
          return true;
        }
        default:
          return false;
      }
    }
    return false;
  };

  useInitialize(() =>
    verifyUserInviteRequest(
      async () => {
        const userInviteApi = new UserInviteApi();
        const userInvite = await userInviteApi.verify(
          checkNotNull(params.userInviteId)
        );
        setUserInvite(userInvite);
      },
      (error) => handleError(error)
    )
  );

  const isConfirmButtonDisabled =
    isNotInitial(newConfirmPassword[2]) ||
    isInitial(newPassword[0]) ||
    isInitial(newConfirmPassword[0]);

  const onChangePasswordConfirm = () =>
    changePasswordRequest(
      async () => {
        setError("");
        // navigate to login page
        const userInviteApi = new UserInviteApi();
        await userInviteApi.changePassword(
          checkNotNull(userInvite?.id),
          checkNotNull(userInvite?.userId),
          newPassword[0]
        );
        toast.success(t(texts.passwordChange.successPasswordChanged));
        navigate(AppRoutes.login.toPath());
      },
      (error) => handleError(error)
    );

  return {
    error,
    isChangePasswordRequestProcessing,
    isConfirmButtonDisabled,
    isVerifyUserInviteRequestProcessing,
    newConfirmPassword,
    newPassword,
    onChangePasswordConfirm,
    userInvite,
  };
};
