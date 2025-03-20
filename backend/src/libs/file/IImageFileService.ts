import { ImageType } from "./types/ImageType";

/**
 * An implementation of this interface provides certain services for handling image files.
 */
export interface IImageFileService {
  /**
   * Converts the given {@link blob} to a base64 string.
   */
  blobToBase64(blob: Blob): Promise<string>;

  /**
   * Convert the given {@link image} to a Base64 encoded image Blob.
   */
  toBase64Blob(image: ImageType, mimeType: string): string;

  /**
   * Convert the given {@link image} to type Buffer.
   */
  toBuffer(image: ImageType): Buffer;
}
