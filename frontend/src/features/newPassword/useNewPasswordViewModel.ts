import { useEffect, useState } from "react";
import { isError } from "../../core/utils/isError";
import { isInitial } from "../../core/utils/isInitial";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { INewPasswordProps } from "./INewPasswordProps";

export const useNewPasswordViewModel = (props: INewPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [showNewConfirmPasswordError, setShowNewConfirmPasswordError] =
    useState(false);
  const [changePasswordRequest, isChangePasswordRequestProcessing] =
    useRequest();

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

  const onChangePasswordConfirm = () =>
    changePasswordRequest(
      async () => {
        // await
      },
      (error) => {
        if (isError(error)) {
          return true;
        }
        return false;
      }
    );

  return {
    confirmButtonDisabled,
    displaySpinner: isChangePasswordRequestProcessing,
    showNewConfirmPasswordError,
    onChangePasswordConfirm,
    onCurrentPassword: setCurrentPassword,
    onNewPassword: setNewPassword,
    onNewConfirmPassword: setNewConfirmPassword,
  };
};
