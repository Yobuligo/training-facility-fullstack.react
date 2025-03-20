import { IImageFileService } from "./IImageFileService";
import { ImageType } from "./types/ImageType";

export class ImageFileService implements IImageFileService {
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

  toBase64Blob(image: ImageType, mimeType: string): string {
    if (Buffer.isBuffer(image)) {
      const base64Image = `data:${mimeType};base64,${image.toString("base64")}`;
      return base64Image;
    }
    return image;
  }

  toBuffer(image: ImageType): Buffer {
    if (!Buffer.isBuffer(image)) {
      const data = image.split(",")[1]; // Remove prefix "data:image/jpeg;base64,"
      return Buffer.from(data, "base64");
    }
    return image;
  }
}
