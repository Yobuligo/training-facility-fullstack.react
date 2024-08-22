import { useSession } from "./useSession";

export const useAuth = () => {
  const [session] = useSession();

  const isAdmin = (): boolean => session?.isAdmin === true;

  return { isAdmin };
};
