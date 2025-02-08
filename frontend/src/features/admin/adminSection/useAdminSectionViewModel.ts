import { useState } from "react";
import { SystemConfigApi } from "../../../api/SystemConfigApi";
import { useAdminSettings } from "../../../hooks/useAdminSettings";
import { useBindProp } from "../../../hooks/useBindProp";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";

export const useAdminSectionViewModel = () => {
  const [displayMode, setDisplayMode] = useState(true);
  const [systemConfig, setSystemConfig] = useState<ISystemConfig | undefined>(
    undefined
  );
  const [loadSystemConfigRequest, isLoadSystemConfigRequestProcessing] =
    useRequest();
  const [collapseWhatsAppGroups, onToggleCollapseWhatsAppGroups] = useBindProp(
    "collapseWhatsAppGroups",
    useAdminSettings()
  );

  useInitialize(() =>
    loadSystemConfigRequest(async () => {
      const systemConfigApi = new SystemConfigApi();
      const systemConfig = await systemConfigApi.findFirst();
      setSystemConfig(systemConfig);
    })
  );

  return {
    collapseWhatsAppGroups,
    displayMode,
    isLoadSystemConfigRequestProcessing,
    onToggleCollapseWhatsAppGroups,
    setDisplayMode,
    systemConfig,
  };
};
