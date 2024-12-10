import { Constructor } from "../../core/types/Constructor";
import { DecoratorStore } from "../decorator/DecoratorStore";
import { IServiceOptions } from "./types/IServiceOptions";

/**
 * This decorator marks a class as service and provides corresponding service options.
 */
export const Service = (options?: IServiceOptions) => {
  return (target: Constructor<any>) => {
    DecoratorStore.set(target, Service, options);
  };
};
