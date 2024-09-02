import { Card } from "../../../components/card/Card";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IUserProfileItem } from "./IUserProfileItemProps";
import styles from "./UserProfileItem.module.scss";

export const UserProfileItem: React.FC<IUserProfileItem> = (props) => {
  const { t } = useTranslation();

  return (
    <Card
      className={style(
        styles.userProfileItem,
        props.userProfileShort.isDeactivated ? styles.deactivated : ""
      )}
      onClick={props.onSelect}
    >
      <div className={styles.group}>
        <div className={styles.name}>
          {`${props.userProfileShort.firstname} ${
            props.userProfileShort.lastname
          } ${
            props.userProfileShort.isDeactivated === true
              ? `(${t(texts.userProfileItem.deactivated)})`
              : ""
          }`}
        </div>
      </div>

      <div className={styles.group}>
        <div>
          {t(texts.userProfile.email)}: {props.userProfileShort.email}
        </div>
      </div>

      <div className={styles.group}>
        <div>
          {t(texts.userProfile.phone)}
          {": "}
          {props.userProfileShort.phone ? props.userProfileShort.phone : ""}
        </div>
      </div>
    </Card>
  );
};
