import { UserInviteApi } from "../../../api/UserInviteApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { isError } from "../../../core/utils/isError";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../../services/UserInfo";
import { IUser } from "../../../shared/model/IUser";
import { IUserInvite } from "../../../shared/model/IUserInvite";
import { UserInviteType } from "../../../shared/types/UserInviteType";
import { uuid } from "../../../utils/uuid";

export const useSendUserInvite = (): [
  send: (user: IUser) => Promise<void>,
  isSending: boolean
] => {
  const { t } = useTranslation();
  const [sendUserInviteRequest, isSendUserInviteRequestProcessing] =
    useRequest();
  const toast = useToast();

  const handleSendMailError = (error: any): boolean => {
    if (isError(error) && error.type === "SendEmailError") {
      toast.error(t(texts.user.errorSendEmail));
      return true;
    } else {
      return false;
    }
  };

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
    }, handleSendMailError);

  return [send, isSendUserInviteRequestProcessing];
};
