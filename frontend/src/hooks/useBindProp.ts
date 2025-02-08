/* eslint-disable react-hooks/rules-of-hooks */
import { Value } from "../core/types/Value";

/**
 * This hook is responsible for creating a binding for property {@link propName} of {@link value} to update the property value.
 *
 * It returns a tuple with the current property value for {@link propName} of {@link value} and the function to update the property value.
 * The given function {@link setValue} is required for updating the underlying useState of {@link value}.
 */
export function useBindProp<T, K extends keyof T>(
  propName: K,
  value: T,
  setValue: (newValue: (previous: T) => T) => void
): [propValue: T[K], setPropValue: (newPropValue: T[K]) => void];

/**
 * This hook is responsible for creating a binding for property {@link propName} of the tuple {@link value}s value to update the property value.
 *
 * It returns a tuple with the current property value for {@link propName} of the tuple {@link value}s value and the function to update the property value.
 * {@link value} also contains a function {@link setValue} that is required for updating the underlying useState of {@link value}s value.
 */
export function useBindProp<T, K extends keyof T>(
  propName: K,
  value: Value<T>
): [propValue: T[K], setPropValue: (newPropValue: T[K]) => void];

export function useBindProp<T, K extends keyof T>(
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
