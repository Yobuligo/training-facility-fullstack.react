import { Search } from "../../../search/Search";
import { UserSearchList } from "../userSearchList/UserSearchList";
import styles from "./UserSearchSection.module.scss";
import { useUserSearchSectionViewModel } from "./useUserSearchSectionViewModel";

export const UserSearchSection: React.FC = () => {
  const viewModel = useUserSearchSectionViewModel();

  return (
    <div className={styles.userSearchSection}>
      <Search
        inputClassName={styles.inputSearch}
        onSearch={viewModel.onSearch}
      />
      <UserSearchList userProfiles={viewModel.userProfiles} />
    </div>
  );
};
