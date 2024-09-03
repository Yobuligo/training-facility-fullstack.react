import { Banner } from "../../../components/banner/Banner";
import { Card } from "../../../components/card/Card";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import colors from "../../../styles/colors.module.scss";
import { IUserProfileItem } from "./IUserProfileItemProps";
import styles from "./UserProfileItem.module.scss";

export const UserProfileItem: React.FC<IUserProfileItem> = (props) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.card} onClick={props.onSelect}>
      <Banner color={colors.colorSecondary} />
      <div
        className={style(
          styles.userProfileItem
          // props.userProfileShort.isDeactivated ? styles.deactivated : ""
        )}
      >
        <div className={styles.group}>
          <div className={styles.name}>
            {`${props.userProfileShort.firstname} ${props.userProfileShort.lastname}`}

            {/*  ${
             props.userProfileShort.isDeactivated === true
               ? `(${t(texts.userProfileItem.deactivated)})`
               : ""
           } */}
          </div>
        </div>

        <div className={styles.group}>
          <div>
            {t(texts.user.email)}: {props.userProfileShort.email}
          </div>
        </div>

        <div className={styles.group}>
          <div>
            {t(texts.user.phone)}
            {": "}
            {props.userProfileShort.phone ? props.userProfileShort.phone : ""}
          </div>
        </div>
      </div>
    </Card>
  );
};
