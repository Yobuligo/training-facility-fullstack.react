import { useRef, useState } from "react";
import {
  centerCrop,
  Crop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop,
} from "react-image-crop";

export const CropConfig = {
  minDimensions: 150,
  aspectRatio: 1,
};
export const useProfileImageCropperViewModel = () => {
  const selectFileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();

  /**
   * Button for displaying file select dialog was clicked.
   */
  const onSelectFileClick = () => selectFileInputRef.current?.click();

  /**
   * Handles file selection
   */
  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const image = reader.result?.toString() ?? "";
      setImage(image);
    });
    reader.readAsDataURL(file);
  };

  /**
   * Completes file loading process by updating the crop to the pictures width and height.
   */
  const onLoadImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const { width, height } = event.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      CropConfig.aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  /**
   * Updates the crop
   */
  const onUpdateCrop = (cropPixel: PixelCrop, cropPercent: PercentCrop) =>
    setCrop(cropPercent);

  return {
    crop,
    image,
    onLoadImage,
    onSelectFile,
    onSelectFileClick,
    onUpdateCrop,
    selectFileInputRef,
    setCrop,
  };
};
