import { IError } from "../../shared/model/IError";
import { HaveTokenMeta } from "../../shared/types/IHaveToken";
import { createError } from "../../shared/utils/createError";
import { isError } from "../../shared/utils/isError";
import { SessionRepo } from "./SessionRepo";

export abstract class RESTApi {
  protected delete<T>(url: string): Promise<T> {
    const extendedUrl = this.extendUrl(url);
    return this.createPromise(extendedUrl, async () => {
      return await fetch(extendedUrl, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        mode: "cors",
      });
    });
  }

  protected get<T>(url: string): Promise<T> {
    const extendedUrl = this.extendUrl(url);
    return this.createPromise(extendedUrl, async () => {
      return await fetch(extendedUrl, {
        method: "GET",
      });
    });
  }

  protected put<T>(url: string, data: any): Promise<T> {
    const extendedUrl = this.extendUrl(url);
    return this.createPromise(extendedUrl, async () => {
      const body = JSON.stringify(data);
      return await fetch(extendedUrl, {
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        mode: "cors",
      });
    });
  }

  protected post<T>(url: string, data: any): Promise<T> {
    const extendedUrl = this.extendUrl(url);
    return this.createPromise(extendedUrl, async () => {
      const body = JSON.stringify(data);
      return await fetch(extendedUrl, {
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
      });
    });
  }

  private async createPromise<T>(
    url: string,
    request: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => Promise<Response>
  ): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await request(resolve, reject);
        if (response.ok) {
          const data = await response.json();
          resolve(data);
        } else {
          const data = await response.json();
          if (isError(data)) {
            reject(data);
          } else {
            reject(this.createFetchError(url));
          }
        }
      } catch (error) {
        if (isError(error)) {
          reject(error);
        } else {
          reject(this.createFetchError(url));
        }
      }
    });
  }

  private createFetchError(url: string): IError {
    return createError(`Error while fetching data from '${url}'`);
  }

  /**
   * Extends the url, e.g. by adding a the session token
   */
  private extendUrl(url: string): string {
    if (SessionRepo.instance.session) {
      return `${url}?${HaveTokenMeta.path}=${SessionRepo.instance.session.id}`;
    }
    return url;
  }
}
