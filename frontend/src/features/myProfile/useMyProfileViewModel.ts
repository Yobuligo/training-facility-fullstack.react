import { useState } from "react";
import { useInitialize } from "../../hooks/useInitialize";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { useSession } from "../../lib/userSession/hooks/useSession";
import { IUser } from "../../shared/model/IUser";

export const useMyProfileViewModel = () => {
  const { t } = useTranslation();
  const [session] = useSession();
  const [error, setError] = useState("");
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const loadUserProfileRequest = useRequest();
  const changeUserProfileRequest = useRequest();

  const loadUser = async () => {
    if (!session) {
      setError(t(texts.myProfile.errorLoadingUserSession));
      return;
    }

    loadUserProfileRequest.send(async () => {
      const userApi = new UserApi();
      const readUserProfile = await userApi.findById(session.userId);
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
    changeUserProfileRequest.send(async () => {
      const userApi = new UserApi();
      await userApi.update(user);
    });

  return {
    error,
    loadUserProfileRequest,
    onChange,
    userProfile: user,
  };
};
