import { Card } from "../../../components/card/Card";
import { style } from "../../../utils/style";
import { UserProfile } from "../userProfile/UserProfile";
import { IUserProfileItem } from "./IUserProfileItemProps";
import styles from "./UserProfileItem.module.scss";

export const UserProfileItem: React.FC<IUserProfileItem> = (props) => {
  return (
    <div>
      <Card
        className={style(
          styles.userProfileItem,
          props.isSelected ? styles.selected : ""
        )}
        onClick={props.onSelect}
      >
        <div className={styles.group}>
          <div className={styles.name}>
            {`${props.userProfile.firstname} ${props.userProfile.lastname}`}
          </div>
          <div className={styles.address}>
            {`${props.userProfile.street} ${props.userProfile.postalCode} ${props.userProfile.city}`}
          </div>
        </div>

        <div className={styles.group}>
          <div>E-Mail: {props.userProfile.email}</div>
          <div>{props.userProfile.phone}</div>
        </div>

        <div className={styles.group}>
          <div>Birthday: {props.userProfile.birthday.toDateString()}</div>
          <div>Joined on: {props.userProfile.joinedOn.toDateString()}</div>
        </div>
      </Card>
      {props.isSelected && (
        <Card>
          <UserProfile
            isAdminMode={true}
            userProfile={props.userProfile}
            onChange={props.onChange}
          />
        </Card>
      )}
    </div>
  );
};
