import { useState } from "react";
import { UserProfileApi } from "../../../../api/UserProfileApi";
import { useRequest } from "../../../../lib/userSession/hooks/useRequest";
import { IUserProfile } from "../../../../shared/model/IUserProfile";
import { IUser } from "../../../../shared/model/IUser";
import { NotImplementedError } from "../../../../core/errors/NotImplementedError";

export const useUserSearchSectionViewModel = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [searchRequest] = useRequest();

  const onSearch = (query: string) => {
    searchRequest(async () => {
      throw new NotImplementedError();
      // const userProfileApi = new UserProfileApi();
      // const userProfiles = await userProfileApi.findByQuery(query);
      // setUser(userProfiles);
    });
  };

  return { onSearch, user };
};
