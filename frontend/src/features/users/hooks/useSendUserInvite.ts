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

export const useSendUserInvite = (): [
  send: (user: IUser) => Promise<void>,
  isSending: boolean
] => {
  const { t } = useTranslation();
  const handleSendEmailError = useHandleSendEmailError();
  const [sendUserInviteRequest, isSendUserInviteRequestProcessing] =
    useRequest();
  const toast = useToast();

  const send = async (user: IUser) =>
    await sendUserInviteRequest(async () => {
      const userInvite: IUserInvite = {
        id: uuid(),
        expiresAt: DateTime.addDays(new Date(), 5),
        type: UserInviteType.REGISTER,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const userInviteApi = new UserInviteApi();
      await userInviteApi.insert(userInvite);
      toast.success(
        t(texts.user.successSendUserInvite, {
          user: UserInfo.toFullName(user),
        })
      );
    }, handleSendEmailError);

  return [send, isSendUserInviteRequestProcessing];
};
