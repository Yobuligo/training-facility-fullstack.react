import ReactCrop from "react-image-crop";
import { AddDocument } from "../../../components/addDocument/AddDocument";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IProfileImageCropperProps } from "./IProfileImageCropperProps";
import styles from "./ProfileImageCropper.module.scss";
import {
  CropConfig,
  useProfileImageCropperViewModel,
} from "./useProfileImageCropperViewModel";

/**
 * This component is responsible for displaying a button to select a user profile image and to crop it.
 */
export const ProfileImageCropper: React.FC<IProfileImageCropperProps> = (
  props
) => {
  const viewModel = useProfileImageCropperViewModel(props);
  const { t } = useTranslation();

  return (
    <>
      <input
        accept="image/*"
        className={styles.input}
        onChange={viewModel.onSelectFile}
        ref={viewModel.selectFileInputRef}
        type="file"
      />

      {viewModel.imageSrc ? (
        <div>
          <ReactCrop
            aspect={CropConfig.aspectRatio}
            circularCrop
            crop={viewModel.crop}
            keepSelection
            onChange={(_, cropPercent) => viewModel.setCrop(cropPercent)}
            minWidth={CropConfig.minDimensions}
          >
            <img
              alt={t(texts.profileImage.preview)}
              src={viewModel.imageSrc}
              className={styles.image}
              onLoad={viewModel.onLoadImage}
              ref={viewModel.imageRef}
            />
          </ReactCrop>
        </div>
      ) : (
        <div className={styles.selectImageContainer}>
          <AddDocument
            onClick={viewModel.onAddFile}
            text={t(texts.profileImage.addImage)}
          />
        </div>
      )}
    </>
  );
};
