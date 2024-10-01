import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { DateTime } from "../../../core/services/date/DateTime";
import { Grade } from "../../../shared/types/Grade";
import componentStyles from "../../../styles/components.module.scss";
import { style } from "../../../core/ui/style";
import styles from "./GradingItem.module.scss";
import { IGradingItemProps } from "./IGradingItemProps";

export const GradingItem: React.FC<IGradingItemProps> = (props) => {
  const { t } = useTranslation();
  const renderMonth = useRenderMonth();

  const gradeToText = (grade: Grade) => {
    switch (grade) {
      case Grade.KUP9:
        return t(texts.gradingItem.kup9);
      case Grade.KUP8:
        return t(texts.gradingItem.kup8);
      case Grade.KUP7:
        return t(texts.gradingItem.kup7);
      case Grade.KUP6:
        return t(texts.gradingItem.kup6);
      case Grade.KUP5:
        return t(texts.gradingItem.kup5);
      case Grade.KUP4:
        return t(texts.gradingItem.kup4);
      case Grade.KUP3:
        return t(texts.gradingItem.kup3);
      case Grade.KUP2:
        return t(texts.gradingItem.kup2);
      case Grade.KUP1:
        return t(texts.gradingItem.kup1);
      case Grade.DAN1:
        return t(texts.gradingItem.dan1);
      case Grade.DAN2:
        return t(texts.gradingItem.dan2);
      case Grade.DAN3:
        return t(texts.gradingItem.dan3);
      case Grade.DAN4:
        return t(texts.gradingItem.dan4);
      case Grade.DAN5:
        return t(texts.gradingItem.dan5);
      case Grade.DAN6:
        return t(texts.gradingItem.dan6);
      case Grade.DAN7:
        return t(texts.gradingItem.dan7);
    }
  };

  const gradeToClassName = (grade: Grade) => {
    switch (grade) {
      case Grade.KUP9:
        return componentStyles.kup9;
      case Grade.KUP8:
        return componentStyles.kup8;
      case Grade.KUP7:
        return componentStyles.kup7;
      case Grade.KUP6:
        return componentStyles.kup6;
      case Grade.KUP5:
        return componentStyles.kup5;
      case Grade.KUP4:
        return componentStyles.kup4;
      case Grade.KUP3:
        return componentStyles.kup3;
      case Grade.KUP2:
        return componentStyles.kup2;
      case Grade.KUP1:
        return componentStyles.kup1;
      case Grade.DAN1:
        return componentStyles.dan;
      case Grade.DAN2:
        return componentStyles.dan;
      case Grade.DAN3:
        return componentStyles.dan;
      case Grade.DAN4:
        return componentStyles.dan;
      case Grade.DAN5:
        return componentStyles.dan;
      case Grade.DAN6:
        return componentStyles.dan;
      case Grade.DAN7:
        return componentStyles.dan;
    }
  };

  const gradeToHalfBeltClassName = (grade: Grade) => {
    switch (grade) {
      case Grade.KUP9:
        return componentStyles.kup9Half;
      case Grade.KUP8:
        return componentStyles.kup8Half;
      case Grade.KUP7:
        return componentStyles.kup7Half;
      case Grade.KUP6:
        return componentStyles.kup6Half;
      case Grade.KUP5:
        return componentStyles.kup5Half;
      case Grade.KUP4:
        return componentStyles.kup4Half;
      case Grade.KUP3:
        return componentStyles.kup3Half;
      case Grade.KUP2:
        return componentStyles.kup2Half;
      case Grade.KUP1:
        return componentStyles.kup1Half;
      case Grade.DAN1:
        return componentStyles.danHalf;
      case Grade.DAN2:
        return componentStyles.danHalf;
      case Grade.DAN3:
        return componentStyles.danHalf;
      case Grade.DAN4:
        return componentStyles.danHalf;
      case Grade.DAN5:
        return componentStyles.danHalf;
      case Grade.DAN6:
        return componentStyles.danHalf;
      case Grade.DAN7:
        return componentStyles.danHalf;
    }
  };

  const belt = (
    <svg
      width="185"
      height="94"
      viewBox="0 0 185 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style(styles.belt, gradeToClassName(props.grading.grade))}
    >
      <path
        d="M96.4093 21.659C106.579 19.6431 111.944 19.2592 120.266 21.659C159.493 6.5 177.833 1.66667 178 1L180.5 23C167.915 29.9602 160.479 33.5924 146.493 36.7126C152.237 41.6619 157.015 46.6913 161.228 52.5C173.491 64.6906 174.874 69.1604 184 85.5C175.5 85.5 171 89.8 163 93C155.341 76.3367 145.5 46.5 145.5 46.5C145.5 46.5 138.89 44.5034 130.5 41.5C131.274 42.1032 127.807 42.3922 116.056 44.7261L117.5 46C109.706 50.3962 104.524 52.1609 93.5 54C93.3968 53.9484 93.1942 53.7946 92.88 53.5C92.7113 53.3333 91.6882 53.2 88.9451 54C88.9595 54.4857 88.9779 54.9855 89 55.5L69.5 38.5C57.625 37.802 46.5 35.8573 39.0921 36.7126C32.0803 46.158 27.9111 56.2754 25.4492 64.5C24.5663 67.4495 23.903 70.1556 23.4068 72.5C22.2445 77.9928 22 81.5 22 81.5C22 81.5 7.61743 79.1174 1 76.5C2.48748 73.2033 3.81599 70.2165 5.02856 67.5C6.44941 64.3168 7.71107 61.5048 8.88276 59C17.1495 41.3279 20.9378 38.9549 44.5593 29.5C45.194 28.6779 45.062 28.8448 45.7212 28C31.7299 21.8417 15.8731 28.1415 7.22125 20.8395L20.5 1C39.4079 12.6026 60.9238 9.90392 83 19.8395C86.6102 21.4643 90.2755 23.1729 94 25C94.5443 23.1353 95.0445 22.2453 96.4093 21.659Z"
        fill="currentColor"
      />
      <path
        d="M96.4093 21.659C106.579 19.6431 111.944 19.2592 120.266 21.659M96.4093 21.659C95.0445 22.2453 94.5443 23.1353 94 25M96.4093 21.659C96.9489 23.1038 97.3089 24.3883 97.5 25.5854M116.056 34.2042C118.814 30.6205 134 27 134 27M116.056 34.2042C118.238 30.8166 119.937 27.8222 120.384 25M116.056 34.2042C114.029 34.5591 112.182 34.8723 110.5 35.148M120.266 21.659C120.542 22.7544 120.564 23.8632 120.384 25M120.266 21.659C159.493 6.5 177.833 1.66667 178 1L180.5 23C167.915 29.9602 160.479 33.5924 146.493 36.7126M94.5381 36.7126C94.1729 37.1044 96.3167 37.3127 106 35.8573M94.5381 36.7126C97.0064 32.3186 98.1079 29.3937 97.5 25.5854M94.5381 36.7126C90.7763 39.9921 89.2971 43.3022 88.9778 49M134 27C134 27 127.698 24.9674 120.384 25M134 27C138.643 30.3308 142.771 33.5049 146.493 36.7126M161.228 52.5C173.491 64.6906 174.874 69.1604 184 85.5C175.5 85.5 171 89.8 163 93C155.341 76.3367 145.5 46.5 145.5 46.5M161.228 52.5C157.015 46.6913 152.237 41.6619 146.493 36.7126M161.228 52.5C157.248 50.5445 145.5 46.5 145.5 46.5M110.5 35.148C108.845 35.4194 107.349 35.6545 106 35.8573M110.5 35.148C117.365 37.021 125.115 39.7842 130.5 41.5M106 35.8573L116.056 44.7261M116.056 44.7261L117.5 46C109.706 50.3962 104.524 52.1609 93.5 54C93.3968 53.9484 93.1942 53.7946 92.88 53.5M116.056 44.7261C127.807 42.3922 131.274 42.1032 130.5 41.5M130.5 41.5C138.89 44.5034 145.5 46.5 145.5 46.5M94 25C73.6342 28.987 70.4175 32.2273 69.5 38.5M94 25C90.2755 23.1729 86.6102 21.4643 83 19.8395M94.5381 25C97.1799 24.9663 97.6312 25.3767 97.5 25.5854M69.5 38.5L89 55.5C88.9779 54.9855 88.9595 54.4857 88.9451 54M69.5 38.5C57.625 37.802 46.5 35.8573 39.0921 36.7126M96.1993 33.5C95.4058 33.5971 93.7435 36.2212 90.9426 41M45.7212 28C31.7299 21.8417 15.8731 28.1415 7.22125 20.8395L20.5 1C39.4079 12.6026 60.9238 9.90392 83 19.8395M45.7212 28C57.2212 20 69.5 18.5 83 19.8395M45.7212 28C45.062 28.8448 45.194 28.6779 44.5593 29.5M44.5593 29.5C42.6302 31.9985 40.812 34.3958 39.0921 36.7126M44.5593 29.5C20.9378 38.9549 17.1495 41.3279 8.88276 59C7.71107 61.5048 6.44941 64.3168 5.02856 67.5C3.81599 70.2165 2.48748 73.2033 1 76.5C7.61743 79.1174 22 81.5 22 81.5C22 81.5 22.2445 77.9928 23.4068 72.5C23.903 70.1556 24.5663 67.4495 25.4492 64.5C27.9111 56.2754 32.0803 46.158 39.0921 36.7126M88.9778 49C88.8943 50.4895 88.8901 52.1421 88.9451 54M88.9778 49C90.9233 51.4856 92.1791 52.8429 92.88 53.5M88.9451 54C91.6882 53.2 92.7113 53.3333 92.88 53.5"
        stroke="white"
      />
      <path
        id="halfcolor"
        d="M5.5 66C7.03074 61.9916 8.73769 59.1541 10 56C24.2782 61.5407 26.0532 62.2901 26 62.5C25.128 65.9701 24.0041 68.7154 23.5 71.5L5.5 66Z"
        className={gradeToHalfBeltClassName(props.grading.grade)}
      />
    </svg>
  );

  return (
    <div className={styles.gradingItem}>
      <div className={styles.card}>
        <div className={styles.beltAndDate}>
          {belt}
          <div className={style(styles.date)}>
            <div className={styles.year}>
              {DateTime.toYear(props.grading.achievedAt)}
            </div>
            <div className={styles.monthAndDay}>
              <div>{DateTime.toDay(props.grading.achievedAt)}</div>
              <div>
                {renderMonth(DateTime.toMonth(props.grading.achievedAt))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.title}>{gradeToText(props.grading.grade)}</div>
          <div className={styles.examiners}>{`${t(
            texts.gradingItem.examiners
          )} ${props.grading.examiners}`}</div>
        </div>
      </div>
      {props.isAdminMode && (
        <div className={styles.deleteIcon}>
          <DeleteIcon disabled={props.displayMode} onClick={props.onDelete} />
        </div>
      )}
    </div>
  );
};
