import { isInitial } from "../../../core/utils/isInitial";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserInfo } from "../../../services/UserInfo";
import { UserProfileItem } from "../userProfileItem/UserProfileItem";
import { IUserProfileListProps } from "./IUserProfileListProps";
import styles from "./UserProfileList.module.scss";

export const UserProfileList: React.FC<IUserProfileListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.usersShort.map((userShort) => (
    <UserProfileItem
      key={userShort.id}
      isAdmin={UserInfo.containsAdminRoleFromShort(userShort.userRoles)}
      onSelect={() => props.onSelect?.(userShort)}
      userShort={userShort}
    />
  ));

  return (
    <div className={styles.userProfileList}>
      {isInitial(items) ? <>{t(texts.general.noEntriesFound)}</> : <>{items}</>}
    </div>
  );
};
