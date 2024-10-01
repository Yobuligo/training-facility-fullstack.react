import { AppConfig } from "../../AppConfig";
import { IRepository } from "../../core/api/types/IRepository";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { PublicRouteMeta } from "../../shared/types/PublicRouteMeta";

export abstract class Repository<T> implements IRepository<T> {
  constructor(protected routeMeta: IRouteMeta) {}

  /**
   * Returns the host name of the backend.
   *
   * @example
   * localhost:5000/api
   */
  protected get host(): string {
    return AppConfig.HOST;
  }

  /**
   * Returns the url for this repository, a combination of host and path.
   *
   * @example
   * localhost:5000/api/persons
   */
  protected get url(): string {
    return `${this.host}${this.routeMeta.path}`;
  }

  /**
   * Returns the url for this repository as public path, a combination of host and path.
   * This path can be used for public access
   *
   * @example
   * localhost:5000/api/public/persons
   */
  protected get publicUrl(): string {
    return `${this.host}${PublicRouteMeta.path}${this.routeMeta.path}`;
  }
}
