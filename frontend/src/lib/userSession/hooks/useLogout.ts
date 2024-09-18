import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserOrNull } from "../../../hooks/useUserOrNull";
import { AppRoutes } from "../../../routes/AppRoutes";
import { UserApi } from "../api/UserApi";

export const useLogout = () => {
  const [, setUser] = useUserOrNull();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const userApi = new UserApi();
      await userApi.logout();
    } catch (error) {
      setIsLoggingOut(false);
      console.log(`Error while logging out current user. ${error}`);
    }
    setUser(undefined);
    navigate(AppRoutes.login.toPath());
    setIsLoggingOut(false);
  };

  return { logout, isLoggingOut };
};
