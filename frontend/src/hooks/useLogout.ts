import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../lib/userSession/api/UserApi";
import { AppRoutes } from "../routes/AppRoutes";
import { useSession } from "../lib/userSession/hooks/useSession";

export const useLogout = () => {
  const [session, setSession] = useSession();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    if (session) {
      try {
        const userApi = new UserApi();
        await userApi.logout(session);
      } catch (error) {
        setIsLoggingOut(false);
        throw error;
      }
    }
    setSession(undefined);
    navigate(AppRoutes.login.toPath());
    setIsLoggingOut(false);
  };

  return { logout, isLoggingOut };
};
