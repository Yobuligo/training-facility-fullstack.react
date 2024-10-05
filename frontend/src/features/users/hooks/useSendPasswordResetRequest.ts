import { UserInviteApi } from "../../../api/UserInviteApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../../services/UserInfo";
import { IUser } from "../../../shared/model/IUser";
import { IUserInvite } from "../../../shared/model/IUserInvite";
import { UserInviteType } from "../../../shared/types/UserInviteType";
import { uuid } from "../../../utils/uuid";
import { useHandleSendEmailError } from "./useHandleSendEmailError";

export const useSendPasswordResetRequest = (): [
  send: (user: IUser) => Promise<void>,
  isSending: boolean
] => {
  const { t } = useTranslation();
  const handleSendEmailError = useHandleSendEmailError();
  const [passwordResetRequest, isPasswordResetRequestProcessing] = useRequest();
  const toast = useToast();

  const send = async (user: IUser) =>
    await passwordResetRequest(async () => {
      const userInvite: IUserInvite = {
        id: uuid(),
        expiresAt: DateTime.addDays(new Date(), 5),
        type: UserInviteType.CHANGE_PASSWORD,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const userInviteApi = new UserInviteApi();
      await userInviteApi.insert(userInvite);
      toast.success(
        t(texts.user.successResetPassword, {
          user: UserInfo.toFullName(user),
        })
      );
    }, handleSendEmailError);

  return [send, isPasswordResetRequestProcessing];
};
