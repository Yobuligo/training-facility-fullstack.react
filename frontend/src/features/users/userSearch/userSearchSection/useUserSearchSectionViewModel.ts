import { useState } from "react";
import { isInitial } from "../../../../core/utils/isInitial";
import { UserApi } from "../../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../../lib/userSession/hooks/useRequest";
import { IUser } from "../../../../shared/model/IUser";

export const useUserSearchSectionViewModel = () => {
  const [user, setUser] = useState<IUser[]>([]);
  const [searchRequest, isSearchRequestProcessing] = useRequest();

  const onSearch = (query: string) => {
    searchRequest(async () => {
      const userApi = new UserApi();
      const users = await userApi.findByQuery(isInitial(query) ? "*" : query);
      users.sort((left, right) => {
        const userProfileLeft = left.userProfile;
        const userProfileRight = right.userProfile;
        if (!userProfileLeft) {
          return -1;
        }

        if (!userProfileRight) {
          return 1;
        }

        if (userProfileLeft.firstname < userProfileRight.firstname) {
          return -1;
        }

        if (userProfileLeft.firstname > userProfileRight.firstname) {
          return 1;
        }

        if (userProfileLeft.lastname < userProfileRight.lastname) {
          return -1;
        }

        if (userProfileLeft.lastname > userProfileRight.lastname) {
          return 1;
        }

        return 0;
      });
      setUser(users);
    });
  };

  return { isSearchRequestProcessing, onSearch, user };
};
