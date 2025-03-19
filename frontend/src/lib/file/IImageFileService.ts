/**
 * An implementation of this interface provides certain services for handling image files.
 */
export interface IImageFileService {
  /**
   * Converts the given {@link encodedImageBlob} to a Buffer.
   */
  base64BlobToBuffer(encodedImageBlob: string): Promise<Buffer>;

  /**
   * Converts the given {@link blob} to a base64 string.
   */
  blobToBase64(blob: Blob): Promise<string>;

  /**
   * Converts the given {@link imageBuffer} to a base64 encoded image Blob.
   */
  bufferToBase64Blob(imageBuffer: Buffer, mimeType: string): Promise<string>;
}
