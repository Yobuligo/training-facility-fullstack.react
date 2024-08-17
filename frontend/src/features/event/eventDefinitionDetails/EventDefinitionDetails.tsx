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
          fromDate={viewModel.fromDate}
          fromTime={viewModel.fromTime}
          recurrence={viewModel.recurrence}
          setDescription={viewModel.setDescription}
          setFromDate={viewModel.setFromDate}
          setFromTime={viewModel.setFromTime}
          setRecurrence={viewModel.setRecurrence}
          setTitle={viewModel.setTitle}
          setToDate={viewModel.setToDate}
          setToTime={viewModel.setToTime}
          title={viewModel.title}
          toDate={viewModel.toDate}
          toTime={viewModel.toTime}
        />
      </ChangeableForm>
    </DetailView>
  );
};
