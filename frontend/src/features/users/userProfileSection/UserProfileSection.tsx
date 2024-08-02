import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Search } from "../../search/Search";
import { UserProfileDetails } from "../userProfileDetails/UserProfileDetails";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";
import { useUserProfileSectionViewModel } from "./useUserProfileSectionViewModel";

export const UserProfileSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useUserProfileSectionViewModel();

  return (
    <div className={styles.userProfileSection}>
      {viewModel.selectedUserProfile ? (
        <UserProfileDetails
          isAdminMode={true}
          userProfile={viewModel.selectedUserProfile}
          onBack={viewModel.onBack}
          onCancel={viewModel.onCancel}
          onChange={viewModel.onChange}
        />
      ) : (
        <>
          <div className={styles.header}>
            <Button onClick={viewModel.onAppend}>
              {t(texts.userProfileSection.addUser)}
            </Button>
            <Search onSearch={(query) => viewModel.setQuery(query)} query={viewModel.query} />
          </div>
          <UserProfileList
            onCancel={viewModel.onCancel}
            onChange={viewModel.onChange}
            onSelect={viewModel.onSelect}
            selected={viewModel.selectedUserProfile}
            userProfiles={viewModel.filterUserProfiles()}
          />
        </>
      )}
    </div>
  );
};
