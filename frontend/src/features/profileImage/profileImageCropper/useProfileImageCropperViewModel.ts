import { useEffect, useRef, useState } from "react";
import { centerCrop, Crop, makeAspectCrop } from "react-image-crop";
import { IProfileImageCropperProps } from "./IProfileImageCropperProps";

export const CropConfig = {
  minDimensions: 150,
  aspectRatio: 1,
};
export const useProfileImageCropperViewModel = (
  props: IProfileImageCropperProps
) => {
  const selectFileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();

  /**
   * Creates an image from the cropped preview file.
   */
  const createCroppedImage = async (
    image: string,
    crop: Crop
  ): Promise<Blob | null> => {
    const img = new Image();
    img.src = image;
    await img.decode();

    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error(
        "Error while creating cropped image. Canvas context not available."
      );
    }

    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  useEffect(() => {
    // Registers callback onCrop. When onCrop is called a blob is created from the currently selected and cropped image.
    if (props.onCrop) {
      props.onCrop(async () => {
        if (image !== "" && crop !== undefined) {
          return createCroppedImage(image, crop);
        }
        return null;
      });
    }
  }, [crop, image, props]);

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
    const cropWidthInPercent = (CropConfig.minDimensions / width) * 100; // ensure that the crop is at least 150 px

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      CropConfig.aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return {
    crop,
    image,
    onLoadImage,
    onSelectFile,
    onSelectFileClick,
    selectFileInputRef,
    setCrop,
  };
};
