import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "../../../core/services/date/DateTime";
import { FuzzySearch } from "../../../core/services/fuzzySearch/FuzzySearch";
import { List } from "../../../core/services/list/List";
import { isInitial } from "../../../core/utils/isInitial";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyUser } from "../../../model/DummyUser";
import { AppRoutes } from "../../../routes/AppRoutes";
import { IUser } from "../../../shared/model/IUser";
import { IUserShort } from "../../../shared/model/IUserShort";
import { useSendUserInvite } from "../hooks/useSendUserInvite";
import { sortByName } from "../utils/sortByName";
import { ISectionRouteParams } from "./../../../routes/ISectionRouteParams";

export const useUserProfileSectionViewModel = () => {
  const [usersShort, setUsersShort] = useState<IUserShort[]>([]);
  const [resignedUsersShort, setResignedUsersShort] = useState<IUserShort[]>(
    []
  );
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [query, setQuery] = useState("");
  const [collapseResigned, setCollapseResigned] = useState(false);
  const [loadUsersShortRequest, isLoadUsersShortRequestProcessing] =
    useRequest();
  const [loadUserRequest, isLoadUserRequestProcessing] = useRequest();
  const [insertUserRequest, isInsertUserRequestProcessing] = useRequest();
  const [updateUserRequest] = useRequest();
  const [deleteUserRequest] = useRequest();
  const [unlockUserRequest] = useRequest();
  const [lockUserRequest] = useRequest();
  const [sendUserInvite] = useSendUserInvite();
  const params = useParams<ISectionRouteParams>();
  const navigate = useNavigate();

  /**
   * Loads and sets a user by the given {@link userId}.
   */
  const loadUser = useCallback(
    (userId: string) =>
      loadUserRequest(async () => {
        const userApi = new UserApi();
        const user = await userApi.findById(userId);

        // sort user guardians by createdAt to display first created at the top
        user?.userProfile?.userGuardians?.sort((left, right) =>
          DateTime.compare(left.createdAt, right.createdAt)
        );
        setSelectedUser(user);
      }),
    [loadUserRequest]
  );

  /**
   * Loads all users in short format. This format contains only some few properties.
   */
  const loadUsersShort = useCallback(
    () =>
      loadUsersShortRequest(async () => {
        const userApi = new UserApi();
        const users: IUserShort[] = await userApi.findAllShort();

        const usersShort: IUserShort[] = [];
        const resignedUsersShort: IUserShort[] = [];

        users.forEach((userShort) => {
          if (userShort.resignedAt === null) {
            usersShort.push(userShort);
          } else {
            resignedUsersShort.push(userShort);
          }
        });

        const sortedUsersShort = sortByName(usersShort);
        setUsersShort(sortedUsersShort);
        const sortedResignedUsersShort = sortByName(resignedUsersShort);
        setResignedUsersShort(sortedResignedUsersShort);
      }),
    [loadUsersShortRequest]
  );

  useEffect(() => {
    // Loads the user by the userId which is given via URL, if provided and no selected user is set
    // if the selected user is set, it means that the details are already displayed.
    if (params.itemId && !selectedUser) {
      loadUser(params.itemId);
    }

    // if no userId was provided via URL, and the usersShort is initial,
    // there is a chance that theses users weren't loaded yet, so load it.
    // This might happen if the user details were displayed via deep link
    // and finally the user navigates back to the user list, which was not initialized yet
    if (!params.itemId && isInitial(usersShort)) {
      loadUsersShort();
    }
  }, [loadUser, loadUsersShort, params.itemId, selectedUser, usersShort]);

  const filterUsers = (): IUserShort[] => {
    if (query.length === 0) {
      return usersShort;
    }
    const fuzzySearch = new FuzzySearch<IUserShort>();
    return fuzzySearch.search(query, usersShort);
  };

  const filterResignedUsers = (): IUserShort[] => {
    if (query.length === 0) {
      return resignedUsersShort;
    }
    const fuzzySearch = new FuzzySearch<IUserShort>();
    return fuzzySearch.search(query, resignedUsersShort);
  };

  useInitialize(() => {
    // loads all users, if no userId (itemId) is set
    // if a userId is set, it means the details of this user should be displayed
    // so there is no need to load all users
    if (!params.itemId) {
      loadUsersShort();
    }
  });

  const createUserShort = (user: IUser): IUserShort => {
    return {
      email: user.userProfile?.email ?? "",
      firstname: user.userProfile?.firstname ?? "",
      id: user.id,
      isLocked: user.isLocked,
      lastname: user.userProfile?.lastname ?? "",
      userRoles:
        user.userRoles?.map((userRole) => ({
          id: userRole.id,
          role: userRole.role,
        })) ?? [],
      phone: user.userProfile?.phone,
      username: user.username,
    };
  };

  /**
   * Updates the user short list
   *
   * @param userId contains an alternative userId of e.g. obsolete entries
   */
  const updateUserShort = (user: IUser, userId?: string) => {
    setUsersShort((previous) => {
      const searchUserId = userId ? userId : user.id;
      const index = previous.findIndex((item) => item.id === searchUserId);
      if (index !== -1) {
        previous.splice(index, 1, createUserShort(user));
      }
      return [...previous];
    });
  };

  /**
   * Navigates to a users details by calling the users path with the userId.
   */
  const onSelect = (userShort: IUserShort) =>
    navigate(AppRoutes.user.toPath({ id: userShort.id }));

  const deleteUser = (user: IUser) =>
    deleteUserRequest(async () => {
      const userApi = new UserApi();
      await userApi.delete(user);
    });

  const insertUser = async (user: IUser, sendInvite: boolean) =>
    insertUserRequest(async () => {
      const userApi = new UserApi();
      const createdUser = await userApi.insert(user);

      if (sendInvite) {
        await sendUserInvite(createdUser);
      }

      updateUserShort(createdUser, user.id);

      // if created user is selected, replace by new created instance, which has an valid uuid
      setSelectedUser(createdUser);
    });

  const updateUser = (user: IUser) =>
    updateUserRequest(async () => {
      const userApi = new UserApi();
      await userApi.update(user);
      updateUserShort(user);
    });

  const onSave = (user: IUser, sendInvite: boolean) => {
    if (user instanceof DummyUser && user.isPersisted === false) {
      user.setIsPersisted();
      insertUser(user, sendInvite);
    } else {
      updateUser(user);
    }
  };

  const onDelete = (user: IUser) => {
    setUsersShort((previous) => {
      setSelectedUser(undefined);
      List.delete(previous, (item) => item.id === user.id);
      deleteUser(user);

      // navigate to user list after deleting a user
      navigate(AppRoutes.users.toPath());
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
   * Unlock an user
   */
  const onUnlock = (user: IUser) => {
    user.isLocked = false;
    user.lockedAt = undefined;
    unlockUserRequest(async () => {
      const userApi = new UserApi();
      await userApi.unlock(user.id);
      updateUserShort(user);
      setSelectedUser(undefined);
    });
  };

  /**
   * Handles event on click back from the user profile detail screen
   */
  const onBack = () => {
    if (selectedUser) {
      onCancel(selectedUser);
    }
    setSelectedUser(undefined);
    navigate(AppRoutes.users.toPath());
  };

  const onCancel = (user: IUser) => {
    // if user is a dummy object (which is not persisted), delete it from the list
    if (user instanceof DummyUser && user.isPersisted === false) {
      setUsersShort((previous) => {
        List.delete(previous, (item) => item.id === user.id);
        return [...previous];
      });
    }
  };

  /**
   * Lock an user
   */
  const onLock = (user: IUser) => {
    user.isLocked = true;
    user.lockedAt = new Date();
    lockUserRequest(async () => {
      const userApi = new UserApi();
      await userApi.lock(user.id);
      updateUserShort(user);
      setSelectedUser(undefined);
    });
  };

  return {
    collapseResigned,
    filterResignedUsers,
    filterUsers,
    isLoadUserRequestProcessing,
    isLoadUsersShortRequestProcessing,
    isInsertUserRequestProcessing,
    onUnlock,
    onAppend,
    onBack,
    onCancel,
    onSave,
    onLock,
    onDelete,
    onSelect,
    query,
    setCollapseResigned,
    selectedUser,
    setQuery,
  };
};
