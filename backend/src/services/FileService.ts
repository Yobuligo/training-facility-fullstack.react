import { IFileService } from "./IFileService";

export class FileService implements IFileService {
  base64BlobToBuffer(encodedBlob: string): Promise<Buffer> {
    return new Promise((resolve) => {
      const data = encodedBlob.split(",")[1]; // Remove prefix "data:image/jpeg;base64,"
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
}
