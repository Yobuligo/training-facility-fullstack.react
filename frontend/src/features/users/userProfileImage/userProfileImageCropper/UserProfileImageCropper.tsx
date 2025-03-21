import ReactCrop from "react-image-crop";
import { AddDocument } from "../../../../components/addDocument/AddDocument";
import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";
import { IUserProfileImageCropperProps } from "./IUserProfileImageCropperProps";
import styles from "./UserProfileImageCropper.module.scss";
import {
  CropConfig,
  useUserProfileImageCropperViewModel,
} from "./useUserProfileImageCropperViewModel";

/**
 * This component is responsible for uploading, cropping and returning a user profile image.
 */
export const UserProfileImageCropper: React.FC<
  IUserProfileImageCropperProps
> = (props) => {
  const viewModel = useUserProfileImageCropperViewModel(props);
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
        <div className={styles.addImageContainer}>
          <AddDocument
            onClick={viewModel.onAddFile}
            text={t(texts.profileImage.addImage)}
          />
        </div>
      )}
    </>
  );
};
