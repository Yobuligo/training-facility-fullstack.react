import { useState } from "react";

export const useLabeledElement = <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (newValue: string) => {
    setError("");
    setValue(newValue as T);
  };

  return { error, onChange, setError, value };
};
