import { ProfileImageEditButton } from "../profileImageEditButton/ProfileImageEditButton";
import { ProfileImageSkeleton } from "../profileImageSkeleton/ProfileImageSkeleton";
import { IProfileImageContainerProps } from "./IProfileImageContainerProps";
import styles from "./ProfileImageContainer.module.scss";
import { useProfileImageContainerViewModel } from "./useProfileImageContainerViewModel";

export const ProfileImageContainer: React.FC<IProfileImageContainerProps> = (
  props
) => {
  const viewModel = useProfileImageContainerViewModel(props);

  return (
    <>
      {viewModel.confirmDialog.content}
      <div className={styles.profileImageContainer}>
        {viewModel.image ? <div>My Image</div> : <ProfileImageSkeleton />}
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
