import { useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { FuzzySearch } from "../../../core/services/fuzzySearch/FuzzySearch";
import { List } from "../../../core/services/list/List";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyUser } from "../../../model/DummyUser";
import { IUser } from "../../../shared/model/IUser";
import { IUserProfileShort } from "./IUserProfileShort";

export const useUserProfileSectionViewModel = () => {
  const [userProfilesShort, setUserProfilesShort] = useState<
    IUserProfileShort[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [query, setQuery] = useState("");
  const loadUserProfilesRequest = useRequest();
  const loadUserRequest = useRequest();
  const insertUserRequest = useRequest();
  const updateUserRequest = useRequest();
  const deleteUserRequest = useRequest();

  const filterUserProfiles = (): IUserProfileShort[] => {
    if (query.length === 0) {
      return userProfilesShort;
    }
    const fuzzySearch = new FuzzySearch<IUserProfileShort>();
    return fuzzySearch.search(query, userProfilesShort);
  };

  useInitialize(() =>
    loadUserProfilesRequest.send(async () => {
      const userProfileApi = new UserProfileApi();
      const userProfilesShort: IUserProfileShort[] =
        await userProfileApi.findAll([
          "id",
          "userId",
          "firstname",
          "lastname",
          "email",
          "phone",
          "isDeactivated",
        ]);
      setUserProfilesShort(userProfilesShort);
    })
  );

  const updateUserProfileShort = (user: IUser) => {
    setUserProfilesShort((previous) => {
      const index = previous.findIndex(
        (item) => item.id === user.userProfile?.id
      );
      if (index !== -1) {
        previous.splice(index, 1, checkNotNull(user.userProfile));
      }
      return [...previous];
    });
  };

  const onSelect = (userProfileShort: IUserProfileShort) =>
    loadUserRequest.send(async () => {
      const userApi = new UserApi();
      const user = await userApi.findById(userProfileShort.userId);
      setSelectedUser(user);
    });

  const deleteUser = (user: IUser) =>
    deleteUserRequest.send(async () => {
      const userApi = new UserApi();
      await userApi.delete(user);
    });

  const insertUser = async (user: IUser) =>
    insertUserRequest.send(async () => {
      const userApi = new UserApi();
      const createdUser = await userApi.insert(user);
      updateUserProfileShort(createdUser);
    });

  const updateUser = (user: IUser) =>
    updateUserRequest.send(async () => {
      const userApi = new UserApi();
      await userApi.update(user);
      updateUserProfileShort(user);
    });

  const onChange = (user: IUser) => {
    if (user instanceof DummyUser && user.isPersisted === false) {
      user.setIsPersisted();
      insertUser(user);
    } else {
      updateUser(user);
    }
  };

  const onDelete = (user: IUser) => {
    setUserProfilesShort((previous) => {
      setSelectedUser(undefined);
      List.delete(previous, (item) => item.id === user.userProfile?.id);
      deleteUser(user);
      return [...previous];
    });
  };

  /**
   * Appends a new user profile, which is not persisted yet
   */
  const onAppend = () =>
    setUserProfilesShort((previous) => {
      const user: IUser = new DummyUser();
      setSelectedUser(user);
      return [checkNotNull(user.userProfile), ...previous];
    });

  /**
   * Handles event on click back from the user profile detail screen
   */
  const onBack = () => {
    if (selectedUser) {
      onCancel(selectedUser);
    }
    setSelectedUser(undefined);
  };

  const onCancel = (user: IUser) => {
    // if user is a dummy object (which is not persisted), delete it from the list
    if (user instanceof DummyUser && user.isPersisted === false) {
      setUserProfilesShort((previous) => {
        List.delete(previous, (item) => item.id === user.userProfile?.id);
        return [...previous];
      });
    }
  };

  return {
    filterUserProfiles,
    loadUserRequest,
    loadUserProfilesRequest,
    insertUserRequest,
    onAppend,
    onBack,
    onCancel,
    onChange,
    onDelete,
    onSelect,
    query,
    selectedUser,
    setQuery,
  };
};
