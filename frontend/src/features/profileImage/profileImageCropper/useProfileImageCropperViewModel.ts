import { useEffect, useRef, useState } from "react";
import {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import { IProfileImageCropperProps } from "./IProfileImageCropperProps";

export const CropConfig = {
  minDimensions: 150,
  aspectRatio: 1,
};
export const useProfileImageCropperViewModel = (
  props: IProfileImageCropperProps
) => {
  const selectFileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  /**
   * Creates an image from the cropped preview file.
   */
  const createCroppedImage = async (
    image: HTMLImageElement,
    crop: Crop
  ): Promise<Blob | null> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error(
        "Error while creating cropped image. Canvas context not available."
      );
    }

    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  useEffect(() => {
    // Registers callback onCrop. When onCrop is called a blob is created from the currently selected and cropped image.
    if (props.onCrop) {
      props.onCrop(async () => {
        if (
          crop !== undefined &&
          imageRef !== null &&
          imageRef.current !== null
        ) {
          return createCroppedImage(
            imageRef.current,
            convertToPixelCrop(
              crop,
              imageRef.current.width,
              imageRef.current.height
            )
          );
        }
        return null;
      });
    }
  }, [crop, props]);

  /**
   * Button for displaying file select dialog was clicked.
   */
  const onAddFile = () => selectFileInputRef.current?.click();

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
      setImageSrc(image);
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
    imageSrc,
    imageRef,
    onAddFile,
    onLoadImage,
    onSelectFile,
    selectFileInputRef,
    setCrop,
  };
};
