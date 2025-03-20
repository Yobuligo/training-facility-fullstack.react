import React from "react";
import { UserProfileImageSize } from "../../../shared/types/UserProfileImageSize";
import { IProfileImageSkeletonProps } from "./IProfileImageSkeletonProps";
import styles from "./ProfileImageSkeleton.module.scss";

/**
 * This component is responsible for displaying a profile image skeleton before in case of loading an image or loading is not possible
 */
export const ProfileImageSkeleton: React.FC<IProfileImageSkeletonProps> = (
  props
) => {
  return (
    <div
      className={
        props.size === undefined || props.size === UserProfileImageSize.ORIGINAL
          ? styles.profileImageSkeletonOriginal
          : styles.profileImageSkeletonThumbnail
      }
    ></div>
  );
};
