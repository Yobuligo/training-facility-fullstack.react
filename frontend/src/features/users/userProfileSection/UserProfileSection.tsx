import { Button } from "../../../components/button/Button";
import { Spinner } from "../../../components/spinner/Spinner";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import colors from "../../../styles/colors.module.scss";
import { Search } from "../../search/Search";
import { UserDetails } from "../userDetails/UserDetails";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";
import { useUserProfileSectionViewModel } from "./useUserProfileSectionViewModel";

export const UserProfileSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useUserProfileSectionViewModel();

  return (
    <div className={styles.userProfileSection}>
      {viewModel.selectedUser ? (
        <UserDetails
          isAdminMode={true}
          user={viewModel.selectedUser}
          onBack={viewModel.onBack}
          onCancel={viewModel.onCancel}
          onChange={viewModel.onChange}
          onDelete={viewModel.onDelete}
        />
      ) : (
        <>
          <div className={styles.header}>
            <Button onClick={viewModel.onAppend}>
              {t(texts.userProfileSection.addUser)}
            </Button>
            <Search
              onSearch={(query) => viewModel.setQuery(query)}
              query={viewModel.query}
            />
          </div>
          {viewModel.loadUserProfilesRequest.isProcessing ||
          viewModel.loadUserRequest.isProcessing ? (
            <Spinner color={colors.colorSecondary} />
          ) : (
            <UserProfileList
              onSelect={viewModel.onSelect}
              userProfilesShort={viewModel.filterUserProfiles()}
            />
          )}
        </>
      )}
    </div>
  );
};
