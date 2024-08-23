import { List } from "../../../../core/services/list/List";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { UserSearchItem } from "../userSearchItem/UserSearchItem";
import { IUserSearchListProps } from "./IUserSearchListProps";
import styles from "./UserSearchList.module.scss";

export const UserSearchList: React.FC<IUserSearchListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.userProfiles.map((userProfile) => (
    <UserSearchItem
      key={userProfile.id}
      onSelect={props.onSelect}
      userProfile={userProfile}
    />
  ));

  return (
    <div className={styles.userSearchList}>
      {List.isEmpty(items) ? (
        <>{t(texts.userSearchList.noEntries)} </>
      ) : (
        <>{items}</>
      )}
    </div>
  );
};
