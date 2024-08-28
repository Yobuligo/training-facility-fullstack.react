import { useCallback, useEffect, useState } from "react";
import { useSession } from "../../lib/userSession/hooks/useSession";
import { IUserProfile } from "../../shared/model/IUserProfile";
import { UserProfileApi } from "../../api/UserProfileApi";
import { useTranslation } from "../../lib/translation/useTranslation";
import { texts } from "../../lib/translation/texts";

export const useMyProfileViewModel = () => {
  const { t } = useTranslation();
  const [session] = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<IUserProfile | undefined>(
    undefined
  );

  const loadUserProfile = useCallback(async () => {
    if (!session) {
      setError(t(texts.myProfile.errorLoadingUserSession));
      return;
    }

    setIsLoading(true);
    const userProfileApi = new UserProfileApi();
    const userProfile = await userProfileApi.findByUserId(session.userId);
    if (!userProfile) {
      setError(t(texts.myProfile.errorLoadingUserSession));
    } else {
      setUserProfile(userProfile);
    }
    setIsLoading(false);
  }, [session, t]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  return {
    error,
    isLoading,
    userProfile,
  };
};
