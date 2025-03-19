import { IFileService } from "./IFileService";

export class FileService implements IFileService {
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
