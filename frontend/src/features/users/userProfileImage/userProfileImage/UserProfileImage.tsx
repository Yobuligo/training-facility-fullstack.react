import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";
import { UserProfileImageSize } from "../../../../shared/types/UserProfileImageSize";
import { UserProfileImageEditButton } from "../userProfileImageEditButton/UserProfileImageEditButton";
import { UserProfileImageSkeleton } from "../userProfileImageSkeleton/UserProfileImageSkeleton";
import { IUserProfileImageProps } from "./IUserProfileImageProps";
import styles from "./UserProfileImage.module.scss";
import { useProfileImageContainerViewModel } from "./useProfileImageContainerViewModel";

/**
 * This component is responsible for displaying an user profile image or alternatively a skeleton.
 * In addition it is possible to trigger the upload of a new user profile image.
 */
export const UserProfileImage: React.FC<IUserProfileImageProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useProfileImageContainerViewModel(props);

  return (
    <>
      {viewModel.confirmDialog.content}
      {viewModel.displayFullscreenDialog.content}
      <div className={styles.userProfileImage}>
        {viewModel.imageSrc ? (
          <img
            className={
              props.size === undefined ||
              props.size === UserProfileImageSize.ORIGINAL
                ? styles.imageOriginal
                : styles.imageThumbnail
            }
            src={viewModel.imageSrc}
            alt={t(texts.profileImage.profileImage)}
            onClick={viewModel.onClickImage}
          />
        ) : (
          <UserProfileImageSkeleton size={props.size} />
        )}
        {props.displayEditButton && (
          <UserProfileImageEditButton
            className={styles.editButton}
            onClick={viewModel.onEdit}
          />
        )}
      </div>
    </>
  );
};
