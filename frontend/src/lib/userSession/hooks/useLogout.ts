import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserOrNull } from "../../../hooks/useUserOrNull";
import { AppRoutes } from "../../../routes/AppRoutes";
import { UserApi } from "../api/UserApi";
import { useSession } from "./useSession";

export const useLogout = () => {
  const [session, setSession] = useSession();
  const [, setUser] = useUserOrNull();
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
        console.log(`Error while logging out current user. ${error}`);
      }
    }
    setSession(undefined);
    setUser(undefined);
    navigate(AppRoutes.login.toPath());
    setIsLoggingOut(false);
  };

  return { logout, isLoggingOut };
};
