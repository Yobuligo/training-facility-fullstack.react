import { Search } from "../../../search/Search";
import { UserSearchList } from "../userSearchList/UserSearchList";
import { IUserSearchSectionProps } from "./IUserSearchSectionProps";
import styles from "./UserSearchSection.module.scss";
import { useUserSearchSectionViewModel } from "./useUserSearchSectionViewModel";

export const UserSearchSection: React.FC<IUserSearchSectionProps> = (props) => {
  const viewModel = useUserSearchSectionViewModel();

  return (
    <div className={styles.userSearchSection}>
      <Search
        inputClassName={styles.inputSearch}
        onSearch={viewModel.onSearch}
      />
      <UserSearchList
        onSelect={props.onSelect}
        users={viewModel.user}
      />
    </div>
  );
};
