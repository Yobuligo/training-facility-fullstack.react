import { Banner } from "../../../components/banner/Banner";
import { Card } from "../../../components/card/Card";
import { style } from "../../../core/ui/style";
import { TrainerIcon } from "../../../icons/TrainerIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserInfo } from "../../../services/UserInfo";
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
          props.userShort.isLocked ? styles.locked : ""
        )}
      >
        <div className={styles.nameContainer}>
          <div className={styles.name}>
            {`${UserInfo.toFullName(props.userShort)} ${
              props.userShort.isLocked === true
                ? `(${t(texts.userProfileItem.locked)})`
                : ""
            }`}
            <div className={styles.age}>{`28 ${t(texts.general.unitAge)}`}</div>
          </div>
          <TrainerIcon
            className={style(
              styles.trainerIconSmallScreen,
              props.isTrainer ? "" : styles.trainerHidden
            )}
          />
        </div>

        <div>
          {t(texts.user.email)}: {props.userShort.email}
        </div>

        <div>
          {t(texts.user.phone)}
          {": "}
          {props.userShort.phone ? props.userShort.phone : ""}
        </div>

        <TrainerIcon
          className={style(
            styles.trainerIconMediumScreen,
            props.isTrainer ? "" : styles.trainerHidden
          )}
        />
      </div>
    </Card>
  );
};
