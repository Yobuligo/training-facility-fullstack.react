import { useState } from "react";
import { useAdminSettings } from "../../../hooks/useAdminSettings";
import { useBindProp } from "../../../hooks/useBindProp";
import { useInitialize } from "../../../hooks/useInitialize";
import { useMemento } from "../../../hooks/useMemento";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummySystemConfig } from "../../../model/DummySystemConfig";
import { ISystemConfig } from "../../../shared/model/ISystemConfig";
import { SystemConfigApi } from "./../../../api/SystemConfigApi";

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

  const [whatsAppURLCommunity, setWhatsAppURLCommunity] = useBindProp(
    "whatsAppURLCommunity",
    systemConfigMemento.toValue()
  );

  const [whatsAppURLKids, setWhatsAppURLKids] = useBindProp(
    "whatsAppURLKids",
    systemConfigMemento.toValue()
  );

  const [whatsAppURLNews, setWhatsAppURLNews] = useBindProp(
    "whatsAppURLNews",
    systemConfigMemento.toValue()
  );

  useInitialize(() =>
    loadSystemConfigRequest(async () => {
      const systemConfigApi = new SystemConfigApi();
      const systemConfig = await systemConfigApi.findFirst();
      systemConfigMemento.override(systemConfig);
    })
  );

  const onRestore = () => systemConfigMemento.restore();

  const onSave = () =>
    saveSystemConfigRequest(async () => {
      const systemConfigApi = new SystemConfigApi();
      await systemConfigApi.update(systemConfigMemento.value);
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
    whatsAppURLCommunity,
    setWhatsAppURLCommunity,
    whatsAppURLKids,
    setWhatsAppURLKids,
    whatsAppURLNews,
    setWhatsAppURLNews,
  };
};
