import { IImageFileService } from "./IImageFileService";

export class ImageFileService implements IImageFileService {
  base64BlobToBuffer(encodedImageBlob: string): Promise<Buffer> {
    return new Promise((resolve) => {
      const data = encodedImageBlob.split(",")[1]; // Remove prefix "data:image/jpeg;base64,"
      resolve(Buffer.from(data, "base64"));
    });
  }

  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        resolve(fileReader.result?.toString() ?? "");
      });
      fileReader.addEventListener("error", () =>
        reject("Error while converting Blob to Base64 string.")
      );
      fileReader.readAsDataURL(blob);
    });
  }

  bufferToBase64Blob(imageBuffer: Buffer, mimeType: string): Promise<string> {
    return new Promise((resolve) => {
      const base64Image = `data:${mimeType};base64,${imageBuffer.toString(
        "base64"
      )}`;
      resolve(base64Image);
    });
  }
}
