import { useCallback, useMemo, useState } from "react";
import { SystemConfigApi } from "../../../api/SystemConfigApi";
import { useAdminSettings } from "../../../hooks/useAdminSettings";
import { useBindProp } from "../../../hooks/useBindProp";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";

const useMemento = <T>() => {
  const [origin, setOrigin] = useState<T | undefined>(undefined);
  const [snapshot, setSnapshot] = useState<T | undefined>(undefined)

  /**
   * This function is responsible for initializing the origin value
   */
  const initialize = useCallback((origin: T) => {
    setOrigin(origin);
  }, []);

  const restore = useCallback(() => {

  }, []);

  const memento = useMemo(
    () => ({ initialize, restore }),
    [initialize, restore]
  );

  return memento;
};

export const useAdminSectionViewModel = () => {
  const [displayMode, setDisplayMode] = useState(true);
  const [systemConfig, setSystemConfig] = useState<ISystemConfig | undefined>(
    undefined
  );
  const memento = useMemento<ISystemConfig>();

  const [editedSystemConfig, setEditedSystemConfig] = useState<
    ISystemConfig | undefined
  >(undefined);
  const [loadSystemConfigRequest, isLoadSystemConfigRequestProcessing] =
    useRequest();
  const [saveSystemConfigRequest, isSaveSystemConfigRequestProcessing] =
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
      memento.initialize(systemConfig);
    })
  );

  const onRestore = () => memento.restore();

  const onSave = () => saveSystemConfigRequest(async () => {});

  return {
    collapseWhatsAppGroups,
    displayMode,
    isLoadSystemConfigRequestProcessing,
    isSaveSystemConfigRequestProcessing,
    onRestore,
    onSave,
    onToggleCollapseWhatsAppGroups,
    setDisplayMode,
    systemConfig,
  };
};
