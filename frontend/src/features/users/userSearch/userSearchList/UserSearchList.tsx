import { List } from "../../../../core/services/list/List";
import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";
import { UserSearchItem } from "../userSearchItem/UserSearchItem";
import { IUserSearchListProps } from "./IUserSearchListProps";
import styles from "./UserSearchList.module.scss";

export const UserSearchList: React.FC<IUserSearchListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.users.map((user) => (
    <UserSearchItem
      key={user.id}
      onSelect={props.onSelect}
      user={user}
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
