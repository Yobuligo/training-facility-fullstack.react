import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isError } from "../../../core/utils/isError";
import { isInitial } from "../../../core/utils/isInitial";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { useUser } from "../../../hooks/useUser";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { AppRoutes } from "../../../routes/AppRoutes";

export const usePasswordChangeViewModel = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const newPassword = useLabeledElement("");
  const newConfirmPassword = useLabeledElement("");
  const [changePasswordError, setChangePasswordError] = useState<
    string | undefined
  >(undefined);
  const [changePasswordRequest, isChangePasswordRequestProcessing] =
    useRequest();
  const [user] = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toast = useToast();

  const confirmButtonDisabled =
    isNotInitial(newConfirmPassword[2]) ||
    isInitial(currentPassword) ||
    isInitial(newPassword[0]) ||
    isInitial(newConfirmPassword[0]);

  const onCancel = () => navigate(AppRoutes.dashboard.toPath());

  const onChangePasswordConfirm = () => {
    setChangePasswordError(undefined);
    changePasswordRequest(
      async () => {
        await new UserApi().changePassword(
          user.id,
          user.username,
          currentPassword,
          newPassword[0]
        );
        toast.success(t(texts.passwordChange.successPasswordChanged));
        navigate(AppRoutes.dashboard.toPath());
      },
      (error) => {
        if (isError(error)) {
          switch (error.type) {
            case "InvalidCredentialsError": {
              setChangePasswordError(
                t(texts.passwordChange.errorCurrentPasswordInvalid)
              );
              return true;
            }
            case "NewPasswordNotPolicyConformError": {
              setChangePasswordError(
                t(texts.passwordChange.errorNewPasswordNotPolicyConfirm)
              );
              return true;
            }
            default:
              return false;
          }
        }
        return false;
      }
    );
  };

  return {
    changePasswordError,
    confirmButtonDisabled,
    displaySpinner: isChangePasswordRequestProcessing,
    newConfirmPassword,
    newPassword,
    onCancel,
    onChangePasswordConfirm,
    setCurrentPassword,
  };
};
