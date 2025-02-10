import { CardList } from "../../../components/cardList/CardList";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { CollapseCard } from "../../../components/collapseCard/CollapseCard";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useAdminSectionViewModel } from "./useAdminSectionViewModel";

export const AdminSection: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useAdminSectionViewModel();

  return (
    <ChangeableForm
      displayMode={viewModel.displayMode}
      displaySaveSpinner={viewModel.isSaveSystemConfigRequestProcessing}
      onCancel={viewModel.onRestore}
      onSave={viewModel.onSave}
      setDisplayMode={viewModel.setDisplayMode}
    >
      <CardList>
        {viewModel.isLoadSystemConfigRequestProcessing ? (
          <PageSpinner />
        ) : (
          <CollapseCard
            collapsed={viewModel.collapseWhatsAppGroups}
            onToggleCollapse={viewModel.onToggleCollapseWhatsAppGroups}
            title={t(texts.admin.whatsAppGroups.title)}
          >
            <LabeledInput
              disabled={viewModel.displayMode}
              label={t(texts.admin.whatsAppGroups.URLNews)}
              value={viewModel.systemConfigMemento.value?.whatsAppURLNews}
            />
            <LabeledInput
              disabled={viewModel.displayMode}
              label={t(texts.admin.whatsAppGroups.URLKids)}
              value={viewModel.systemConfigMemento.value?.whatsAppURLKids}
            />
            <LabeledInput
              disabled={viewModel.displayMode}
              label={t(texts.admin.whatsAppGroups.URLCommunity)}
              value={viewModel.systemConfigMemento.value?.whatsAppURLCommunity}
            />
          </CollapseCard>
        )}
      </CardList>
    </ChangeableForm>
  );
};
