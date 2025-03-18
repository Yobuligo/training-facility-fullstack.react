import { useRef, useState } from "react";
import { Crop, makeAspectCrop } from "react-image-crop";

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

  const onImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const { width, height } = event.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "px",
        width: CropConfig.minDimensions,
      },
      CropConfig.aspectRatio,
      width,
      height
    );
    setCrop(crop);
  };

  return {
    crop,
    image,
    onImageLoad,
    onSelectFile,
    onSelectFileClick,
    selectFileInputRef,
    setCrop,
  };
};
