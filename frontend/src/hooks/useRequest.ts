import { useMemo, useState } from "react";

export const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const send = async <T>(block: () => Promise<T>) => {
    setIsLoading(true);
    await block();
    setIsLoading(false);
  };

  const request = useMemo(() => {
    return {
      isLoading,
      send,
    };
  }, [isLoading]);

  return request;
};
