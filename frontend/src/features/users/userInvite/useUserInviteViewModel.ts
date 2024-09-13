import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserInviteApi } from "../../../api/UserInviteApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isError } from "../../../core/utils/isError";
import { isInitial } from "../../../core/utils/isInitial";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useInitialize } from "../../../hooks/useInitialize";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserInviteShort } from "../../../shared/model/IUserInviteShort";

export const useUserInviteViewModel = () => {
  const params = useParams<{ userInviteId: string }>();
  const [verifyUserInviteRequest, isVerifyUserInviteRequestProcessing] =
    useRequest();
  const [userInvite, setUserInvite] = useState<IUserInviteShort | undefined>(
    undefined
  );
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [
    newConfirmPassword,
    setNewConfirmPassword,
    newConfirmPasswordError,
    setNewConfirmPasswordError,
  ] = useLabeledElement("");
  const { t } = useTranslation();

  useInitialize(() =>
    verifyUserInviteRequest(
      async () => {
        const userInviteApi = new UserInviteApi();
        const userInvite = await userInviteApi.verify(
          checkNotNull(params.userInviteId)
        );
        setUserInvite(userInvite);
      },
      (error) => {
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
      }
    )
  );

  const isConfirmButtonDisabled =
    isNotInitial(newConfirmPasswordError) ||
    isInitial(newPassword) ||
    isInitial(newConfirmPassword);

  const onChangePasswordConfirm = () => {
    setError("");
  };

  return {
    error,
    isConfirmButtonDisabled,
    isVerifyUserInviteRequestProcessing,
    newConfirmPassword,
    newConfirmPasswordError,
    newPassword,
    onChangePasswordConfirm,
    setNewConfirmPassword,
    setNewConfirmPasswordError,
    setNewPassword,
    userInvite,
  };
};
