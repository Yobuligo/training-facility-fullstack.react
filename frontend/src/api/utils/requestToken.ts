import { TokenApi } from "../TokenApi";

export const requestToken = async (): Promise<string> => {
  const tokenApi = new TokenApi();
  const tokenRequest = await tokenApi.create();
  return tokenRequest.token;
};
