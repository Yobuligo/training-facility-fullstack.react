import { UserApi } from "../lib/userSession/api/UserApi";
import { useRequest } from "../lib/userSession/hooks/useRequest";
import { useSession } from "../lib/userSession/hooks/useSession";
import { useInitialize } from "./useInitialize";
import { useUser } from "./useUser";

/**
 * This hook is responsible for loading a user from a current session.
 */
export const useUserLoader = () => {
  const [session] = useSession();
  const [user, setUser] = useUser();
  const loadRequest = useRequest();

  useInitialize(() => {
    // check if user was already loaded and not reload each time
    if (!user && session) {
      loadRequest.send(async () => {
        const userApi = new UserApi();
        const user = await userApi.findByIdInternal(session.userId);
        setUser(user);
      });
    }
  });

  return { loadRequest, user };
};
