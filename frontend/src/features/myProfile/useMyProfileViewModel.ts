import { useCallback, useEffect, useState } from "react";
import { UserProfileApi } from "../../api/UserProfileApi";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { useSession } from "../../lib/userSession/hooks/useSession";
import { IUserProfile } from "../../shared/model/IUserProfile";

export const useMyProfileViewModel = () => {
  const { t } = useTranslation();
  const [session] = useSession();
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(
    undefined
  );
  const loadUserProfileRequest = useRequest();
  const changeUserProfileRequest = useRequest();

  const loadUserProfile = useCallback(async () => {
    if (!session) {
      setError(t(texts.myProfile.errorLoadingUserSession));
      return;
    }

    loadUserProfileRequest.send(async () => {
      const userProfileApi = new UserProfileApi();
      const readUserProfile = await userProfileApi.findByUserId(session.userId);
      if (!readUserProfile) {
        setError(t(texts.myProfile.errorLoadingUserSession));
      } else {
        setUserProfile(readUserProfile);
      }
    });
  }, [session]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const onChange = (userProfile: IUserProfile) =>
    changeUserProfileRequest.send(async () => {
      const userProfileApi = new UserProfileApi();
      await userProfileApi.update(userProfile);
    });

  return {
    error,
    loadUserProfileRequest,
    onChange,
    userProfile,
  };
};
