export interface IProfileImageCropperProps {
  /**
   * This function is called when a parent component wants to crop the current selected image.
   * So the function is responsible to register a handler which can cropping and returning an image.
   */
  onCrop?: (handler: () => Promise<Blob | null>) => void;
}
