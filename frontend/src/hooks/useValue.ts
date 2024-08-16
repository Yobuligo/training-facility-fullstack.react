import { useState } from "react";

export const useValue = <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (newValue: T) => setValue(newValue);
  return { onChange, setValue, value };
};
