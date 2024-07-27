import { useEffect, useState } from "react";
import { UserProfileApi } from "../../../api/UserProfileApi";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { UserProfileList } from "../userProfileList/UserProfileList";

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
    <>
      <UserProfileList userProfiles={userProfiles} />
    </>
  );
};
