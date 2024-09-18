import { useState } from "react";
import { useInitialize } from "../../hooks/useInitialize";
import { useUser } from "../../hooks/useUser";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IUser } from "../../shared/model/IUser";

export const useMyProfileViewModel = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const [sessionUser] = useUser();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loadUserProfileRequest, isLoadUserProfileRequestProcessing] =
    useRequest();
  const [changeUserProfileRequest] = useRequest();

  const loadUser = async () => {
    loadUserProfileRequest(async () => {
      const userApi = new UserApi();
      const readUserProfile = await userApi.findById(sessionUser.id);
      if (!readUserProfile) {
        setError(t(texts.myProfile.errorLoadingUserSession));
      } else {
        setUser(readUserProfile);
      }
    });
  };

  useInitialize(() => {
    loadUser();
  });

  const onChange = (user: IUser) =>
    changeUserProfileRequest(async () => {
      const userApi = new UserApi();
      await userApi.update(user);
    });

  return {
    error,
    isLoadUserProfileRequestProcessing,
    onChange,
    user,
  };
};
