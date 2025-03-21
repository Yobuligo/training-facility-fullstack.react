import React from "react";
import { UserProfileImageSize } from "../../../../shared/types/UserProfileImageSize";
import { IUserProfileImageSkeletonProps } from "./IUserProfileImageSkeletonProps";
import styles from "./UserProfileImageSkeleton.module.scss";

/**
 * This component is responsible for displaying a user profile image skeleton, as fallback if the image is not yet available.
 */
export const UserProfileImageSkeleton: React.FC<
  IUserProfileImageSkeletonProps
> = (props) => {
  return (
    <div
      className={
        props.size === undefined || props.size === UserProfileImageSize.ORIGINAL
          ? styles.userProfileImageSkeletonOriginal
          : styles.userProfileImageSkeletonThumbnail
      }
    ></div>
  );
};
