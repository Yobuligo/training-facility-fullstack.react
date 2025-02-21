import { Button } from "../../../components/button/Button";
import { Collapse } from "../../../components/collapse/Collapse";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Search } from "../../search/Search";
import { UserDetails } from "../userDetails/UserDetails";
import { UserProfileList } from "../userProfileList/UserProfileList";
import styles from "./UserProfileSection.module.scss";
import { useUserProfileSectionViewModel } from "./useUserProfileSectionViewModel";

const UserProfileSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useUserProfileSectionViewModel();

  return (
    <div className={styles.userProfileSection}>
      {viewModel.selectedUser ? (
        <UserDetails
          isAdminMode={true}
          user={viewModel.selectedUser}
          onUnlock={viewModel.onUnlock}
          onBack={viewModel.onBack}
          onCancel={viewModel.onCancel}
          onSave={viewModel.onSave}
          onLock={viewModel.onLock}
          onDelete={viewModel.onDelete}
        />
      ) : (
        <>
          <div className={styles.header}>
            <Button onClick={viewModel.onAppend}>
              {t(texts.userProfileSection.addUser)}
            </Button>
            <Search
              className={styles.search}
              onSearch={(query) => viewModel.setQuery(query)}
              query={viewModel.query}
              searchImplicit={true}
            />
          </div>
          {viewModel.isLoadUsersShortRequestProcessing ||
          viewModel.isLoadUserRequestProcessing ||
          viewModel.isInsertUserRequestProcessing ? (
            <PageSpinner />
          ) : (
            <>
              <UserProfileList
                onSelect={viewModel.onSelect}
                usersShort={viewModel.filterUsers()}
              />
              <Collapse
                className={styles.collapse}
                collapsed={viewModel.collapseResigned}
                setCollapsed={viewModel.setCollapseResigned}
                title={t(texts.userProfileSection.resignedUsers)}
              />
              {!viewModel.collapseResigned && (
                <UserProfileList
                  onSelect={viewModel.onSelect}
                  usersShort={viewModel.filterResignedUsers()}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfileSection;
