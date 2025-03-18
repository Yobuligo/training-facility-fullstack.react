import { useRef } from "react";
import { Button } from "../../../components/button/Button";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IProfileImageCropperProps } from "./IProfileImageCropperProps";
import styles from "./ProfileImageCropper.module.scss";

/**
 * This component is responsible for displaying a button to select a profile image and to crop it.
 */
export const ProfileImageCropper: React.FC<IProfileImageCropperProps> = (
  props
) => {
  const { t } = useTranslation();
  const selectFileInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => selectFileInputRef.current?.click();

  return (
    <Button onClick={onClick}>
      <input
        accept="image/*"
        capture="environment"
        className={styles.input}
        ref={selectFileInputRef}
        type="file"
      />
      {t(texts.profileImage.gallery)}
    </Button>
  );
};
