import { UserApi } from "../lib/userSession/api/UserApi";
import { useRequest } from "../lib/userSession/hooks/useRequest";
import { useInitialize } from "./useInitialize";
import { useUserOrNull } from "./useUserOrNull";

/**
 * This hook is responsible for loading a user from the current session.
 */
export const useUserLoader = () => {
  const [user, setUser] = useUserOrNull();
  const [loadRequest, isLoadRequestProcessing] = useRequest();

  useInitialize(() => {
    // check if user was already loaded and not reload each time
    if (!user) {
      loadRequest(async () => {
        const userApi = new UserApi();
        const user = await userApi.findSession();
        setUser(user);
      });
    }
  });

  return { isProcessing: isLoadRequestProcessing, user };
};
