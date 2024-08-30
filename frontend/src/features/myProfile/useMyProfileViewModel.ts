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

  const loadUserProfile = useCallback(async () => {
    if (!session) {
      setError(t(texts.myProfile.errorLoadingUserSession));
      return;
    }

    loadUserProfileRequest.send(async () => {
      const userProfileApi = new UserProfileApi();
      const userProfile = await userProfileApi.findByUserId(session.userId);
      if (!userProfile) {
        setError(t(texts.myProfile.errorLoadingUserSession));
      } else {
        setUserProfile(userProfile);
      }
    });
  }, [loadUserProfileRequest, session, t]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  return {
    error,
    loadUserProfileRequest,
    userProfile,
  };
};
