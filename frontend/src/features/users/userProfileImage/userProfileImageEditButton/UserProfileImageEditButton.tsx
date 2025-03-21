import { style } from "../../../../core/ui/style";
import { EditIcon } from "../../../../icons/EditIcon";
import { IUserProfileImageEditButtonProps } from "./IUserProfileImageEditButtonProps";
import styles from "./UserProfileImageEditButton.module.scss";

/**
 * This component is responsible for displaying a button for editing the user profile image.
 */
export const UserProfileImageEditButton: React.FC<
  IUserProfileImageEditButtonProps
> = (props) => {
  return (
    <button
      className={style(styles.button, props.className)}
      onClick={props.onClick}
    >
      <EditIcon className={styles.editIcon} />
    </button>
  );
};
