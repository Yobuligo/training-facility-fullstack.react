import { useEffect, useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { DummyUserProfile } from "../../../model/DummyUserProfile";
import { FuzzySearch } from "../../../services/fuzzySearch/FuzzySearch";
import { IUserProfile } from "../../../shared/model/IUserProfile";

export const useUserProfileSectionViewModel = () => {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState<
    IUserProfile | undefined
  >();
  const [query, setQuery] = useState("");

  const loadUserProfiles = async () => {
    const userProfileApi = new UserProfileApi();
    const userProfiles = await userProfileApi.findAll();
    setUserProfiles(userProfiles);
  };

  const filterUserProfiles = (): IUserProfile[] => {
    if (query.length === 0) {
      return userProfiles;
    }
    const fuzzySearch = new FuzzySearch<IUserProfile>();
    return fuzzySearch.search(query, userProfiles);
  };

  useEffect(() => {
    loadUserProfiles();
  }, []);

  const onSelect = (userProfile: IUserProfile) =>
    setSelectedUserProfile((previous) => {
      if (previous === userProfile) {
        return undefined;
      }
      return userProfile;
    });

  const onChange = (userProfile: IUserProfile) =>
    setUserProfiles((previous) => {
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
    setUserProfiles((previous) => {
      const userProfile: IUserProfile = new DummyUserProfile();
      setSelectedUserProfile(userProfile);
      return [userProfile, ...previous];
    });
  };

  /**
   * Handles event on click back from the user profile detail screen
   */
  const onBack = () => setSelectedUserProfile(undefined);

  const onCancel = (userProfile: IUserProfile) => {
    // if user profile is a dummy object (which is not persisted), delete it from the list
    if (
      userProfile instanceof DummyUserProfile &&
      userProfile.isPersisted === false
    ) {
      setUserProfiles((previous) => {
        const index = previous.findIndex((item) => item.id === userProfile.id);
        if (index !== -1) {
          previous.splice(index, 1);
        }
        return [...previous];
      });
    }
  };

  return {
    filterUserProfiles,
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
