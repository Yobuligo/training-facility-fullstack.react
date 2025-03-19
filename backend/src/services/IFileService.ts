/**
 * An implementation of this interface provides certain services for handling files.
 */
export interface IFileService {
  /**
   * Converts the given {@link encodedBlob} to a Buffer.
   */
  base64BlobToBuffer(encodedBlob: string): Promise<Buffer>;

  /**
   * Converts the given {@link blob} to a Base64 string.
   */
  blobToBase64(blob: Blob): Promise<string>;
}
