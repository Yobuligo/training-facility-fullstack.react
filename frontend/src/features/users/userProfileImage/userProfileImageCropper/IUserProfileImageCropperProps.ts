export interface IUserProfileImageCropperProps {
  /**
   * Provides an image source that should be displayed as default. E.g. an already uploaded user profile image.
   */
  imageSrc?: string;

  /**
   * This register function is responsible to register a handler to request the cropping the currently selected image.
   * The caller component (parent) can cache the handler and notify it to create a cropped image from the current selection.
   * The handler will return the cropped image or null if no image is selected.
   */
  onRequestCrop?: (handler: () => Promise<Blob | null>) => void;

  /**
   * This register function is responsible to register a handler to request the deletion of the currently selected image.
   * The caller component (parent) can cache the handler and notify it to delete the currently selected image.
   */
  onRequestDelete?: (handler: VoidFunction) => void;
}
