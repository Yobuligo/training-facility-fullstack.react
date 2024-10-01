import { TokenRepository } from "../api/core/TokenRepository";
import { requestToken } from "../api/utils/requestToken";
import { useRequest } from "../lib/userSession/hooks/useRequest";

/**
 * This hook is responsible for sending a request and adding a public token to authorize the request.
 */
export const useTokenRequest = (): [
  send: (
    block: () => Promise<void>,
    errorHandler?: (error: any) => boolean
  ) => Promise<void>,
  isProcessing: boolean
] => {
  const [request, isRequestProcessing] = useRequest();

  const send = async (
    block: () => Promise<void>,
    errorHandler?: (error: any) => boolean
  ) =>
    request(
      async () => {
        TokenRepository.token = await requestToken();
        await block();
        TokenRepository.token = undefined;
      },
      (error) => {
        TokenRepository.token = undefined;
        return errorHandler?.(error) ?? false;
      }
    );

  return [send, isRequestProcessing];
};
