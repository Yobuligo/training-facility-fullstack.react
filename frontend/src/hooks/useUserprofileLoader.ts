import { useEffect } from "react";
import { UserProfileApi } from "../api/UserProfileApi";
import { useRequest } from "../lib/userSession/hooks/useRequest";
import { useSession } from "../lib/userSession/hooks/useSession";
import { useUserProfile } from "./useUserProfile";

/**
 * This hook is responsible for loading a user profile from a current session.
 */
export const useUserprofileLoader = () => {
  const [session] = useSession();
  const loadUserProfileRequest = useRequest();
  const [userProfile, setUserProfile] = useUserProfile();

  useEffect(() => {
    if (session && !loadUserProfileRequest.isProcessing) {
      loadUserProfileRequest.send(async () => {
        const userProfileApi = new UserProfileApi();
        const userProfile = await userProfileApi.findByUserId(session.userId);
        setUserProfile(userProfile);
      });
    }
  }, [loadUserProfileRequest, session, setUserProfile]);

  return { request: loadUserProfileRequest, userProfile };
};
