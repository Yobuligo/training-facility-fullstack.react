import { useState } from "react";
import { UserProfileApi } from "../../../../api/UserProfileApi";
import { useRequest } from "../../../../lib/userSession/hooks/useRequest";
import { IUserProfile } from "../../../../shared/model/IUserProfile";

export const useUserSearchSectionViewModel = () => {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);
  const [searchRequest] = useRequest();

  const onSearch = (query: string) => {
    searchRequest(async () => {
      const userProfileApi = new UserProfileApi();
      const userProfiles = await userProfileApi.findByQuery(query);
      setUserProfiles(userProfiles);
    });
  };

  return { onSearch, userProfiles };
};
