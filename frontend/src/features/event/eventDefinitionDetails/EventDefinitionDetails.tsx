import { AppointmentForm } from "../../../components/appointmentForm/AppointmentForm";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { DetailView } from "../../../components/detailView/DetailView";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";
import { useEventDefinitionDetailsViewModel } from "./useEventDefinitionDetailsViewModel";

export const EventDefinitionDetails: React.FC<IEventDefinitionDetailsProps> = (
  props
) => {
  const viewModel = useEventDefinitionDetailsViewModel(props);

  return (
    <DetailView onBack={props.onBack}>
      <ChangeableForm
        displayMode={viewModel.displayMode}
        onCancel={viewModel.onCancel}
        onSave={viewModel.onSave}
        setDisplayMode={viewModel.setDisplayMode}
      >
        <AppointmentForm
          description={viewModel.description}
          disabled={viewModel.displayMode}
          from={viewModel.from}
          recurrence={viewModel.recurrence}
          setDescription={viewModel.setDescription}
          setFrom={viewModel.setFrom}
          setRecurrence={viewModel.setRecurrence}
          setTitle={viewModel.setTitle}
          setTo={viewModel.setTo}
          title={viewModel.title}
          to={viewModel.to}
        />
      </ChangeableForm>
    </DetailView>
  );
};
