import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { ProfileImageEditButton } from "../profileImageEditButton/ProfileImageEditButton";
import { ProfileImageSkeleton } from "../profileImageSkeleton/ProfileImageSkeleton";
import { IProfileImageContainerProps } from "./IProfileImageContainerProps";
import styles from "./ProfileImageContainer.module.scss";
import { useProfileImageContainerViewModel } from "./useProfileImageContainerViewModel";

export const ProfileImageContainer: React.FC<IProfileImageContainerProps> = (
  props
) => {
  const { t } = useTranslation();
  const viewModel = useProfileImageContainerViewModel(props);

  return (
    <>
      {viewModel.confirmDialog.content}
      <div className={styles.profileImageContainer}>
        {viewModel.image ? (
          <img
            className={styles.image}
            src={viewModel.image}
            alt={t(texts.profileImage.profileImage)}
          />
        ) : (
          <ProfileImageSkeleton />
        )}
        {props.displayEditButton && (
          <ProfileImageEditButton
            className={styles.editButton}
            onClick={viewModel.onEdit}
          />
        )}
      </div>
    </>
  );
};
