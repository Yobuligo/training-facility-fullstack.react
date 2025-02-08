import { useState } from "react";
import { SystemConfigApi } from "../../../api/SystemConfigApi";
import { useAdminSettingsStorage } from "../../../hooks/useAdminSettingsStorage";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";

export const useAdminSectionViewModel = () => {
  const [displayMode, setDisplayMode] = useState(true);
  const [systemConfig, setSystemConfig] = useState<ISystemConfig | undefined>(
    undefined
  );
  const [adminSettings, setAdminSettings] = useAdminSettingsStorage();
  const [loadSystemConfigRequest, isLoadSystemConfigRequestProcessing] =
    useRequest();

  useInitialize(() =>
    loadSystemConfigRequest(async () => {
      const systemConfigApi = new SystemConfigApi();
      const systemConfig = await systemConfigApi.findFirst();
      setSystemConfig(systemConfig);
    })
  );

  const onToggleCollapseWhatsAppGroups = (collapse: boolean) =>
    setAdminSettings((previous) => {
      previous.collapseWhatsAppGroups = collapse;
      return { ...previous };
    });

  return {
    adminSettings,
    displayMode,
    isLoadSystemConfigRequestProcessing,
    onToggleCollapseWhatsAppGroups,
    setAdminSettings,
    setDisplayMode,
    systemConfig,
  };
};
