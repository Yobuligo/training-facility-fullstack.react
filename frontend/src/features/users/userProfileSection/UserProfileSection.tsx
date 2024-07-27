import { useEffect, useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { Button } from "../../../components/button/Button";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";

export const UserProfileSection: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);

  const loadUserProfiles = async () => {
    const userProfileApi = new UserProfileApi();
    const userProfiles = await userProfileApi.findAll();
    setUserProfiles(userProfiles);
  };

  useEffect(() => {
    loadUserProfiles();
  }, []);

  return (
    <div className={styles.userProfileSection}>
      <div>
        <Button>Add User</Button>
      </div>
      <UserProfileList userProfiles={userProfiles} />
    </div>
  );
};
