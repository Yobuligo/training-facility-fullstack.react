import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserInviteApi } from "../../../api/UserInviteApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { isError } from "../../../core/utils/isError";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IUserInvite } from "../../../shared/model/IUserInvite";

export const useUserInviteViewModel = () => {
  const params = useParams<{ userInviteId: string }>();
  const [verifyUserInviteRequest, isVerifyUserInviteRequestProcessing] =
    useRequest();
  const [userInvite, setUserInvite] = useState<IUserInvite | undefined>(
    undefined
  );
  const [error, setError] = useState("");

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
              return true;
            }
            case "NotFoundError": {
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

  return { isVerifyUserInviteRequestProcessing };
};
