/* eslint-disable react-hooks/rules-of-hooks */
import { Value } from "../../../core/types/Value";
import { useProfileDetailsSettings } from "../../../hooks/useProfileDetailsSettings";
import { IProfileDetailsSettings } from "../../../model/IProfileDetailSettings";

function bindProp<T, K extends keyof T>(
  propName: K,
  value: T,
  setValue: (newValue: (previous: T) => T) => void
): [propValue: T[K], setPropValue: (newPropValue: T[K]) => void];
function bindProp<T, K extends keyof T>(
  propName: K,
  value: Value<T>
): [propValue: T[K], setPropValue: (newPropValue: T[K]) => void];
function bindProp<T, K extends keyof T>(
  propName: K,
  first: unknown,
  second?: unknown
): [propValue: T[K], setPropValue: (newPropValue: T[K]) => void] {
  let propValue: T[K];
  let setPropValue: (newPropValue: T[K]) => void;

  if (second === undefined) {
    const value = first as Value<T>;
    propValue = value[0][propName];
    setPropValue = (newPropValue: T[K]) => {
      const setValue = value[1];
      setValue((previous) => {
        previous[propName] = newPropValue;
        return { ...previous };
      });
    };
  } else {
    propValue = (first as T)[propName];
    setPropValue = (newPropValue: T[K]) => {
      const setValue = second as (newValue: (previous: T) => T) => void;
      setValue((previous) => {
        previous[propName] = newPropValue;
        return { ...previous };
      });
    };
  }

  return [propValue, setPropValue];
}

const value: IProfileDetailsSettings & { firstname: string } = {
  collapseAddress: false,
  collapseBank: false,
  firstname: "Stacey",
};

bindProp("collapseBank", value, () => {});
// eslint-disable-next-line react-hooks/rules-of-hooks
const [propValue2, setPropValue2] = bindProp(
  "collapsePersonalInformation",
  useProfileDetailsSettings()
);

// eslint-disable-next-line react-hooks/rules-of-hooks
const [propValue, setPropValue] = bindProp(
  "collapseAddress",
  useProfileDetailsSettings()
);
useBindProp();
