import { AuthRole } from "../shared/types/AuthRole";
import { useUser } from "./useUser";

export const useAuth = () => {
  const [user] = useUser();

  const isAdmin = (): boolean => {
    return (
      user.userRoles.findIndex(
        (userRole) => userRole.role === AuthRole.ADMIN
      ) !== -1
    );
  };

  return { isAdmin };
};
