import { useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { FuzzySearch } from "../../../core/services/fuzzySearch/FuzzySearch";
import { List } from "../../../core/services/list/List";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyUserProfile } from "../../../model/DummyUserProfile";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { IUserProfileShort } from "./IUserProfileShort";

export const useUserProfileSectionViewModel = () => {
  const [userProfilesShort, setUserProfilesShort] = useState<
    IUserProfileShort[]
  >([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState<
    IUserProfile | undefined
  >();
  const [query, setQuery] = useState("");
  const loadUserProfilesRequest = useRequest();
  const loadUserProfileRequest = useRequest();

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

  const onSelect = (userProfileShort: IUserProfileShort) =>
    loadUserProfileRequest.send(async () => {
      const userProfileApi = new UserProfileApi();
      const userProfile = await userProfileApi.findById(userProfileShort.id);
      setSelectedUserProfile(userProfile);
    });

  const onChange = (userProfile: IUserProfile) =>
    setUserProfilesShort((previous) => {
      const index = previous.findIndex((item) => item.id === userProfile.id);

      // todo: if user profile is a dummy object (which is not persisted), save it to db and mark it as persisted
      const userProfileApi = new UserProfileApi();
      if (
        userProfile instanceof DummyUserProfile &&
        userProfile.isPersisted === false
      ) {
        userProfile.setIsPersisted();

        userProfileApi.insert(userProfile);
      } else {
        userProfileApi.update(userProfile);
      }

      if (index !== -1) {
        previous.splice(index, 1, userProfile);
      }
      return [...previous];
    });

  /**
   * Appends a new user profile, which is not persisted yet
   */
  const onAppend = () => {
    setUserProfilesShort((previous) => {
      const userProfile: IUserProfile = new DummyUserProfile();
      setSelectedUserProfile(userProfile);
      return [userProfile, ...previous];
    });
  };

  /**
   * Handles event on click back from the user profile detail screen
   */
  const onBack = () => setSelectedUserProfile(undefined);

  const onCancel = (userProfileShort: IUserProfileShort) => {
    // if user profile is a dummy object (which is not persisted), delete it from the list
    if (
      userProfileShort instanceof DummyUserProfile &&
      userProfileShort.isPersisted === false
    ) {
      setUserProfilesShort((previous) => {
        List.delete(previous, (item) => item.id === userProfileShort.id);
        return [...previous];
      });
    }
  };

  return {
    filterUserProfiles,
    loadUserProfileRequest,
    loadUserProfilesRequest,
    onAppend,
    onBack,
    onCancel,
    onChange,
    onSelect,
    query,
    selectedUserProfile,
    setQuery,
  };
};
