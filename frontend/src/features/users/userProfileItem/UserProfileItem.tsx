import { Card } from "../../../components/card/Card";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserProfileDetails } from "../userProfileDetails/UserProfileDetails";
import { IUserProfileItem } from "./IUserProfileItemProps";
import styles from "./UserProfileItem.module.scss";

export const UserProfileItem: React.FC<IUserProfileItem> = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Card
        className={style(
          styles.userProfileItem,
          props.userProfile.isDeactivated ? styles.deactivated : "",
          props.isSelected ? styles.selected : ""
        )}
        onClick={props.onSelect}
      >
        <div className={styles.group}>
          <div className={styles.name}>
            {`${props.userProfile.firstname} ${props.userProfile.lastname} ${
              props.userProfile.isDeactivated === true
                ? `(${t(texts.userProfileItem.deactivated)})`
                : ""
            }`}
          </div>
          <div className={styles.address}>
            {`${props.userProfile.street} ${props.userProfile.postalCode} ${props.userProfile.city}`}
          </div>
        </div>

        <div className={styles.group}>
          <div>
            {t(texts.userProfile.email)}: {props.userProfile.email}
          </div>
          <div>
            {t(texts.userProfile.phone)}: {props.userProfile.phone}
          </div>
        </div>

        <div className={styles.group}>
          <div>
            {t(texts.userProfile.birthday)}
            {": "}
            {props.userProfile.birthday?.toString()}
          </div>
          <div>
            {t(texts.userProfile.joinedOn)}
            {": "}
            {props.userProfile.joinedOn.toDateString()}
          </div>
        </div>
      </Card>
      {props.isSelected && (
        <Card>
          <UserProfileDetails
            isAdminMode={true}
            onCancel={props.onCancel}
            onChange={props.onChange}
            userProfile={props.userProfile}
          />
        </Card>
      )}
    </div>
  );
};
