import ReactCrop from "react-image-crop";
import { Button } from "../../../components/button/Button";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IProfileImageCropperProps } from "./IProfileImageCropperProps";
import styles from "./ProfileImageCropper.module.scss";
import {
  CropConfig,
  useProfileImageCropperViewModel,
} from "./useProfileImageCropperViewModel";

/**
 * This component is responsible for displaying a button to select a profile image and to crop it.
 */
const ProfileImageCropper: React.FC<IProfileImageCropperProps> = (props) => {
  const viewModel = useProfileImageCropperViewModel();
  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={viewModel.onSelectFileClick}>
        <input
          accept="image/*"
          capture="environment"
          className={styles.input}
          onChange={viewModel.onSelectFile}
          ref={viewModel.selectFileInputRef}
          type="file"
        />
        {t(texts.profileImage.gallery)}
      </Button>

      {viewModel.image ? (
        <div>
          <ReactCrop
            aspect={CropConfig.aspectRatio}
            circularCrop
            crop={viewModel.crop}
            keepSelection
            onChange={viewModel.setCrop}
            minWidth={CropConfig.minDimensions}
          >
            <img
              alt={t(texts.profileImage.preview)}
              src={viewModel.image}
              className={styles.image}
              onLoad={viewModel.onImageLoad}
            />
          </ReactCrop>
        </div>
      ) : (
        <div className={styles.selectImageContainer}>
          {t(texts.profileImage.pleaseSelectedImage)}
        </div>
      )}
    </div>
  );
};

export default ProfileImageCropper;
