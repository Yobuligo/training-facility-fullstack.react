import { UserRole } from "../shared/types/UserRole";
import { useUser } from "./useUser";

export const useAuth = () => {
  const [user] = useUser();

  const isAdmin = (): boolean => {
    return (
      user.userRoles.findIndex(
        (userRole) => userRole.role === UserRole.ADMIN
      ) !== -1
    );
  };

  return { isAdmin };
};
