import { style } from "../../../core/ui/style";
import { EditIcon } from "../../../icons/EditIcon";
import { IProfileImageEditButtonProps } from "./IProfileImageEditButtonProps";
import styles from "./ProfileImageEditButton.module.scss";

/**
 * This component is responsible for displaying a button for editing the profile image.
 */
export const ProfileImageEditButton: React.FC<IProfileImageEditButtonProps> = (
  props
) => {
  return (
    <button
      className={style(styles.button, props.className)}
      onClick={props.onClick}
    >
      <EditIcon className={styles.editIcon} />
    </button>
  );
};
