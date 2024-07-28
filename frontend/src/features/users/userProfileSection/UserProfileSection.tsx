import { useEffect, useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { Button } from "../../../components/button/Button";
import { Card } from "../../../components/card/Card";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { UserProfile } from "../userProfile/UserProfile";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";

export const UserProfileSection: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);
  const [selectedUserProfile, setSelectedUserProfile] = useState<
    IUserProfile | undefined
  >();

  const loadUserProfiles = async () => {
    const userProfileApi = new UserProfileApi();
    const userProfiles = await userProfileApi.findAll();
    setUserProfiles(userProfiles);
  };

  useEffect(() => {
    loadUserProfiles();
  }, []);

  const onSelect = (userProfile: IUserProfile) =>
    setSelectedUserProfile(userProfile);

  return (
    <div className={styles.userProfileSection}>
      <div>
        <Button>Add User</Button>
      </div>
      <div className={styles.list}>
        <UserProfileList
          onSelect={onSelect}
          selected={selectedUserProfile}
          userProfiles={userProfiles}
        />
        {selectedUserProfile && (
          <Card>
            <UserProfile isAdminMode={true} userProfile={selectedUserProfile} />
          </Card>
        )}
      </div>
    </div>
  );
};
