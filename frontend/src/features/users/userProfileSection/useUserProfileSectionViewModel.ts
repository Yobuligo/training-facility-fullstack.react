import { useState } from "react";
import { FuzzySearch } from "../../../core/services/fuzzySearch/FuzzySearch";
import { List } from "../../../core/services/list/List";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyUser } from "../../../model/DummyUser";
import { IUser } from "../../../shared/model/IUser";
import { IUserShort } from "../../../shared/model/IUserShort";

export const useUserProfileSectionViewModel = () => {
  const [usersShort, setUsersShort] = useState<IUserShort[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [query, setQuery] = useState("");
  const loadUserProfilesRequest = useRequest();
  const loadUserRequest = useRequest();
  const insertUserRequest = useRequest();
  const updateUserRequest = useRequest();
  const deleteUserRequest = useRequest();
  const activateUserRequest = useRequest();
  const deactivateUserRequest = useRequest();

  const filterUserProfiles = (): IUserShort[] => {
    if (query.length === 0) {
      return usersShort;
    }
    const fuzzySearch = new FuzzySearch<IUserShort>();
    return fuzzySearch.search(query, usersShort);
  };

  useInitialize(() =>
    loadUserProfilesRequest.send(async () => {
      const userApi = new UserApi();
      const usersShort: IUserShort[] = await userApi.findAllShort();
      const sortedUserProfilesShort = usersShort.sort((left, right) => {
        if (left.firstname < right.firstname) {
          return -1;
        }

        if (left.firstname > right.firstname) {
          return 1;
        }

        if (left.lastname < right.lastname) {
          return -1;
        }

        if (left.lastname > right.lastname) {
          return 1;
        }
        return 0;
      });
      setUsersShort(sortedUserProfilesShort);
    })
  );

  const createUserShort = (user: IUser): IUserShort => {
    return {
      email: user.userProfile?.email ?? "",
      firstname: user.userProfile?.firstname ?? "",
      id: user.id,
      isDeactivated: user.isDeactivated,
      lastname: user.userProfile?.lastname ?? "",
      userRoles: user.userRoles?.map((userRole) => userRole.role) ?? [],
      phone: user.userProfile?.phone,
    };
  };

  const updateUserProfileShort = (user: IUser) => {
    setUsersShort((previous) => {
      const index = previous.findIndex((item) => item.id === user.id);
      if (index !== -1) {
        previous.splice(index, 1, createUserShort(user));
      }
      return [...previous];
    });
  };

  const onSelect = (userShort: IUserShort) =>
    loadUserRequest.send(async () => {
      const userApi = new UserApi();
      const user = await userApi.findById(userShort.id);
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
    setUsersShort((previous) => {
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
    setUsersShort((previous) => {
      const user: IUser = new DummyUser();
      setSelectedUser(user);
      return [createUserShort(user), ...previous];
    });

  /**
   * Activates an user
   */
  const onActivate = (user: IUser) =>
    activateUserRequest.send(async () => {
      const userApi = new UserApi();
      await userApi.activate(user.id);
      updateUserProfileShort(user);
      setSelectedUser(undefined);
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
      setUsersShort((previous) => {
        List.delete(previous, (item) => item.id === user.userProfile?.id);
        return [...previous];
      });
    }
  };

  /**
   * Deactivates an user
   */
  const onDeactivate = (user: IUser) =>
    deactivateUserRequest.send(async () => {
      const userApi = new UserApi();
      await userApi.deactivate(user.id);
      updateUserProfileShort(user);
      setSelectedUser(undefined);
    });

  return {
    filterUserProfiles,
    loadUserRequest,
    loadUserProfilesRequest,
    insertUserRequest,
    onActivate,
    onAppend,
    onBack,
    onCancel,
    onChange,
    onDeactivate,
    onDelete,
    onSelect,
    query,
    selectedUser,
    setQuery,
  };
};
