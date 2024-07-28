import { Button } from "../../../components/button/Button";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { Search } from "../../search/Search";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";
import { useUserProfileSectionViewModel } from "./useUserProfileSectionViewModel";

export const UserProfileSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useUserProfileSectionViewModel();

  return (
    <div className={styles.userProfileSection}>
      <div className={styles.header}>
        <Button onClick={viewModel.onAdd}>
          {t(texts.userProfileSection.addUser)}
        </Button>
        <Search onSearch={(query) => viewModel.setQuery(query)} />
      </div>
      <UserProfileList
        onCancel={viewModel.onCancel}
        onChange={viewModel.onChange}
        onSelect={viewModel.onSelect}
        selected={viewModel.selectedUserProfile}
        userProfiles={viewModel.filterUserProfiles()}
      />
    </div>
  );
};
