import { CardList } from "../../../components/cardList/CardList";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { CollapseCard } from "../../../components/collapseCard/CollapseCard";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useAdminSectionViewModel } from "./useAdminSectionViewModel";

const AdminSection: React.FC = () => {
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
              onChange={viewModel.setWhatsAppURLNews}
              value={viewModel.whatsAppURLNews}
            />
            <LabeledInput
              disabled={viewModel.displayMode}
              label={t(texts.admin.whatsAppGroups.URLKids)}
              onChange={viewModel.setWhatsAppURLKids}
              value={viewModel.whatsAppURLKids}
            />
            <LabeledInput
              disabled={viewModel.displayMode}
              label={t(texts.admin.whatsAppGroups.URLCommunity)}
              onChange={viewModel.setWhatsAppURLCommunity}
              value={viewModel.whatsAppURLCommunity}
            />
          </CollapseCard>
        )}
      </CardList>
    </ChangeableForm>
  );
};

export default AdminSection;
