import { useState } from "react";
import { ProfileImageEditButton } from "../profileImageEditButton/ProfileImageEditButton";
import { ProfileImageSkeleton } from "../profileImageSkeleton/ProfileImageSkeleton";
import { IProfileImageContainerProps } from "./IProfileImageContainerProps";
import styles from "./ProfileImageContainer.module.scss";

export const ProfileImageContainer: React.FC<IProfileImageContainerProps> = (
  props
) => {
  const [image, setImage] = useState(props.image);

  return (
    <div className={styles.profileImageContainer}>
      {image ? <div>My Image</div> : <ProfileImageSkeleton />}
      {props.displayEditButton && (
        <ProfileImageEditButton className={styles.editButton} />
      )}
    </div>
  );
};
