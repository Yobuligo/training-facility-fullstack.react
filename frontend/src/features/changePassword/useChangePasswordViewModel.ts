import { useEffect, useState } from "react";
import { isError } from "../../core/utils/isError";
import { isInitial } from "../../core/utils/isInitial";
import { useUser } from "../../hooks/useUser";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IChangePasswordProps } from "./IChangePasswordProps";

export const useChangePasswordViewModel = (props: IChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showNewConfirmPasswordError, setShowNewConfirmPasswordError] =
    useState(false);
  const [changePasswordError, setChangePasswordError] = useState<
    string | undefined
  >(undefined);
  const [changePasswordRequest, isChangePasswordRequestProcessing] =
    useRequest();
  const [user] = useUser();
  const { t } = useTranslation();

  useEffect(() => {
    if (newConfirmPassword !== "") {
      if (newPassword !== newConfirmPassword) {
        setShowNewConfirmPasswordError(true);
      } else {
        setShowNewConfirmPasswordError(false);
      }
    }
  }, [newPassword, newConfirmPassword]);

  const confirmButtonDisabled =
    showNewConfirmPasswordError ||
    isInitial(currentPassword) ||
    isInitial(newPassword) ||
    isInitial(newConfirmPassword);

  const onCancel = () => {};

  const onChangePasswordConfirm = () =>
    changePasswordRequest(
      async () => {
        const result = await new UserApi().changePassword(user.id, {
          username: user.username,
          password: currentPassword,
          newPassword,
        });
        if(result){

        }
      },
      (error) => {
        if (isError(error)) {
          switch (error.type) {
            case "InvalidCredentialsError": {
              setChangePasswordError(
                t(texts.changePassword.errorCurrentPasswordInvalid)
              );
              return true;
            }
            case "NewPasswordNotPolicyConformError": {
              setChangePasswordError(
                t(texts.changePassword.errorNewPasswordNotPolicyConfirm)
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

  return {
    changePasswordError,
    confirmButtonDisabled,
    displaySpinner: isChangePasswordRequestProcessing,
    showNewConfirmPasswordError,
    onCancel,
    onChangePasswordConfirm,
    onCurrentPassword: setCurrentPassword,
    onNewPassword: setNewPassword,
    onNewConfirmPassword: setNewConfirmPassword,
  };
};
