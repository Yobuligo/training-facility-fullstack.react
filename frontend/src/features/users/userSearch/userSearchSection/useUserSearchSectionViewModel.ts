import { useState } from "react";
import { UserApi } from "../../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../../lib/userSession/hooks/useRequest";
import { IUser } from "../../../../shared/model/IUser";

export const useUserSearchSectionViewModel = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [searchRequest, isSearchRequestProcessing] = useRequest();

  const onSearch = (query: string) => {
    searchRequest(async () => {
      const userApi = new UserApi();
      const users = await userApi.findByQuery(query);
      setUser(users);
    });
  };

  return { isSearchRequestProcessing, onSearch, user };
};
