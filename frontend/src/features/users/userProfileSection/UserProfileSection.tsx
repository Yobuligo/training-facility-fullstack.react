import { useEffect, useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { Button } from "../../../components/button/Button";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";
import { Search } from "../../search/Search";
import { FuzzySearch } from "../../../services/fuzzySearch/FuzzySearch";

export const UserProfileSection: React.FC = () => {
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
      if (index !== -1) {
        previous.splice(index, 1, userProfile);
      }
      return [...previous];
    });

  return (
    <div className={styles.userProfileSection}>
      <div className={styles.header}>
        <Button>Add User</Button>
        <Search onSearch={(query) => setQuery(query)} />
      </div>
      <UserProfileList
        onChange={onChange}
        onSelect={onSelect}
        selected={selectedUserProfile}
        userProfiles={filterUserProfiles()}
      />
    </div>
  );
};
