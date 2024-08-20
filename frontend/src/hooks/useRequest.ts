import { useState } from "react";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const request = async <T>(block: () => Promise<T>) => {
    await block();
  };

  return { isLoading };
};
