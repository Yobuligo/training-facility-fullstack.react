import { Search } from "../../../search/Search";
import { UserSelectList } from "../userSelectList/UserSelectList";
import { IUserSelectSectionProps } from "./IUserSelectSectionProps";
import styles from "./UserSelection.module.scss";
import { useUserSelectSectionViewModel } from "./useUserSelectSectionViewModel";

export const UserSelectSection: React.FC<IUserSelectSectionProps> = (props) => {
  const viewModel = useUserSelectSectionViewModel(props);

  return (
    <div className={styles.userSelection}>
      <Search onSearch={viewModel.onSearch} />
      <UserSelectList userProfiles={viewModel.userProfiles}/>
    </div>
  );
};
