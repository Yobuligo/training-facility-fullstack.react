import { useState } from "react";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";

export const useAdminSectionViewModel = () => {
  const [systemConfig, setSystemConfig] = useState<ISystemConfig | undefined>(
    undefined
  );
  const [loadSystemConfigRequest, isLoadSystemConfigRequestProcessing] =
    useRequest();

  useInitialize(async () => {
    
  });

  return { isLoadSystemConfigRequestProcessing, systemConfig };
};
