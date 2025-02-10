import { useCallback, useMemo, useState } from "react";
import { SystemConfigApi } from "../../../api/SystemConfigApi";
import { useAdminSettings } from "../../../hooks/useAdminSettings";
import { useBindProp } from "../../../hooks/useBindProp";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummySystemConfig } from "../../../model/DummySystemConfig";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";

const useMemento = <T>(origin: T) => {
  const [value, setValue] = useState(origin);
  const [snapshot, setSnapshot] = useState({ ...value });

  /**
   * Restores the value by the last snapshot
   */
  const restore = useCallback(() => {
    setValue({ ...snapshot });
  }, [setValue, snapshot]);

  /**
   * Saves the changes by updating the snapshot with the current state.
   */
  const save = useCallback(() => {
    setSnapshot({ ...value });
  }, [value]);

  /**
   * Initializes the value and the snapshot. So withdraws the changes.
   */
  const initialize = useCallback(
    (newValue: T) => {
      setValue(newValue);
      save();
    },
    [save, setValue]
  );

  const memento = useMemo(
    () => ({ initialize, restore, save, setValue, value }),
    [initialize, restore, save, setValue, value]
  );

  return memento;
};

export const useAdminSectionViewModel = () => {
  const [displayMode, setDisplayMode] = useState(true);

  const systemConfigMemento = useMemento<ISystemConfig>(
    new DummySystemConfig()
  );

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
      systemConfigMemento.initialize(systemConfig);
    })
  );

  const onRestore = () => systemConfigMemento.restore();

  const onSave = () =>
    saveSystemConfigRequest(async () => {
      systemConfigMemento.save();
    });

  return {
    collapseWhatsAppGroups,
    displayMode,
    isLoadSystemConfigRequestProcessing,
    isSaveSystemConfigRequestProcessing,
    onRestore,
    onSave,
    onToggleCollapseWhatsAppGroups,
    setDisplayMode,
    systemConfigMemento,
  };
};
