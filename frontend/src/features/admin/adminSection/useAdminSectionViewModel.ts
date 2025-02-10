import { useState } from "react";
import { SystemConfigApi } from "../../../api/SystemConfigApi";
import { Value } from "../../../core/types/Value";
import { useAdminSettings } from "../../../hooks/useAdminSettings";
import { useBindProp } from "../../../hooks/useBindProp";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";


const useMemento = <T>(
  value: Value<T>,
  config?: { onSave: (value: T) => void; onRestore: () => void }
) => {
  const [snapshot, setSnapShot] = useState({ ...value[0] });

  const save = () => {
    value[1](snapshot);
    config?.onSave(snapshot);
  };

  const restore = (value: T) => {
    setSnapShot(value);
    config?.onRestore();
  };

  return [save, restore];
};


export const useAdminSectionViewModel = () => {
  const [displayMode, setDisplayMode] = useState(true);
  const [systemConfig, setSystemConfig] = useState<ISystemConfig | undefined>(
    undefined
  );
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
    })
  );

  const restore = () => {};

  const onRestore = () => restore();

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

