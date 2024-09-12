import { Constructor } from "../../core/types/Constructor";

export const SequelizeModel = <TConstructor extends Constructor<any>>(
  Base: TConstructor,
  /**
   * This function is responsible to associate models with each other by creating relations
   */
  associate: () => void
) => {
  return class SuperClass extends Base {
    static associate() {
      associate();
    }
  };
};
