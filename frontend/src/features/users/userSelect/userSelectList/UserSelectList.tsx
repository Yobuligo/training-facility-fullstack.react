import { List } from "../../../../core/services/list/List";
import { texts } from "../../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../../hooks/useTranslation/useTranslation";
import { UserSelectItem } from "../userSelectItem/UserSelectItem";
import { IUserSelectListProps } from "./IUserSelectListProps";
import styles from "./UserSelectList.module.scss";

export const UserSelectList: React.FC<IUserSelectListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.userProfiles.map((userProfile) => (
    <UserSelectItem key={userProfile.id} userProfile={userProfile} />
  ));

  return (
    <div className={styles.userSelectList}>
      {List.isEmpty(items) ? (
        <>{t(texts.userSelectList.noEntries)} </>
      ) : (
        <>{items}</>
      )}
    </div>
  );
};
