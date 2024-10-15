import { useState } from "react";

export const useDebounce = () => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const debounce = (block: () => void, milliseconds: number) => {
    clearTimeout(debounceTimeout);
    const newDebounceTimeout = setTimeout(block, milliseconds);
    setDebounceTimeout(newDebounceTimeout);
  };

  return debounce;
};
