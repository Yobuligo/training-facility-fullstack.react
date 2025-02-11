import { useCallback, useMemo, useState } from "react";
import { Value } from "../core/types/Value";
import { IMemento } from "./types/IMemento";

/**
 * This hook is responsible for providing access to data, which can be restored or saved.
 */
export const useMemento = <T>(origin: T): IMemento<T> => {
  const [value, setValue] = useState(origin);
  const [snapshot, setSnapshot] = useState({ ...value });

  /**
   * Restores the value by the last snapshot
   */
  const restore = useCallback(() => {
    setValue({ ...snapshot });
  }, [setValue, snapshot]);

  /**
   * Saves the changes by updating the snapshot with the current state.
   */
  const save = useCallback(() => {
    setSnapshot({ ...value });
  }, [value]);

  /**
   * Overrides the current changes by resetting the value and the snapshot.
   */
  const override = useCallback(
    (newValue: T) => {
      setValue(newValue);
      setSnapshot({ ...newValue });
    },
    [setValue]
  );

  /**
   * This function is responsible for converting the value to a value tuple of type {@link Value}.
   */
  const toValue = useCallback((): Value<T> => [value, setValue], [value]);

  const memento = useMemo(
    () => ({ override, restore, save, setValue, toValue, value }),
    [override, restore, save, toValue, value]
  );

  return memento;
};
