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
      <Banner
        color={
          props.isAdmin ? colors.colorBannerAdmin : colors.colorBannerNeutral
        }
      />
      <div
        className={style(
          styles.userProfileItem,
          props.userShort.isDeactivated ? styles.deactivated : ""
        )}
      >
        <div className={styles.group}>
          <div className={styles.name}>
            {`${props.userShort.firstname} ${props.userShort.lastname} ${
              props.userShort.isDeactivated === true
                ? `(${t(texts.userProfileItem.deactivated)})`
                : ""
            }`}
          </div>
        </div>

        <div className={styles.group}>
          <div>
            {t(texts.user.email)}: {props.userShort.email}
          </div>
        </div>

        <div className={styles.group}>
          <div>
            {t(texts.user.phone)}
            {": "}
            {props.userShort.phone ? props.userShort.phone : ""}
          </div>
        </div>
      </div>
    </Card>
  );
};
