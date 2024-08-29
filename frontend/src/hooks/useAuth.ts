import { UserRole } from "../shared/types/UserRole";
import { useUserProfile } from "./useUserProfile";

export const useAuth = () => {
  const [userProfile] = useUserProfile();

  const isAdmin = (): boolean =>
    userProfile?.userRoles.findIndex(
      (userRole) => userRole.role === UserRole.ADMIN
    ) !== -1;

  return { isAdmin };
};
