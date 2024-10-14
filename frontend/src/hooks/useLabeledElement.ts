import { useState } from "react";
import { UseLabeledElement } from "./types/UseLabeledElement";

export const useLabeledElement = <T>(initialValue: T): UseLabeledElement<T> => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const updateValue = (newValue: T | ((previous: T) => T)) => {
    setError("");
    setValue(newValue as T);
  };

  return [value, updateValue, error, setError];
};
