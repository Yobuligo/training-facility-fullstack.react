import React from "react";
import styles from "./ProfileImageSkeleton.module.scss";

/**
 * This component is responsible for displaying a profile image skeleton before in case of loading an image or loading is not possible
 */
export const ProfileImageSkeleton: React.FC = () => {
  return <div className={styles.profileImageSkeleton}></div>;
};
