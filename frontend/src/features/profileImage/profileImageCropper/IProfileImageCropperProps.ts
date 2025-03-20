export interface IProfileImageCropperProps {
  imageSrc?: string;

  /**
   * This function is called when a parent component requests to crop the current selected image.
   * So the function is responsible to register a handler which can cropping and returning an image.
   */
  onCropRequest?: (handler: () => Promise<Blob | null>) => void;

  /**
   * This function is called when a parent requests to delete the current selected image.
   * So the function is responsible to register a handler which can delete an image.
   */
  onDeleteRequest?: (handler: VoidFunction) => void;
}
