import { useState } from "react";

export const useLabeledElement = <T>(
  initialValue: T
): [
  value: T,
  updateValue: React.Dispatch<React.SetStateAction<T>>,
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>
] => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const updateValue = (newValue: T | ((previous: T) => T)) => {
    setError("");
    setValue(newValue as T);
  };

  return [value, updateValue, error, setError];
};
