import { AppointmentForm } from "../../../components/appointmentForm/AppointmentForm";
import { ChangeableForm } from "../../../components/changeableForm/ChangeableForm";
import { DetailView } from "../../../components/detailView/DetailView";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import colors from "../../../styles/colors.module.scss";
import { style } from "../../../utils/style";
import styles from "./EventDefinitionDetails.module.scss";
import { IEventDefinitionDetailsProps } from "./IEventDefinitionDetailsProps";
import { useEventDefinitionDetailsViewModel } from "./useEventDefinitionDetailsViewModel";

export const EventDefinitionDetails: React.FC<IEventDefinitionDetailsProps> = (
  props
) => {
  const viewModel = useEventDefinitionDetailsViewModel(props);

  const renderButton = (color: string, className: string) => {
    return (
      <button
        className={style(
          className,
          viewModel.selectedColor === color ? styles.selectedButton : ""
        )}
        onClick={() => viewModel.onSelectColor(color)}
      />
    );
  };

  return (
    <DetailView onBack={props.onBack}>
      <ChangeableForm
        displayMode={viewModel.displayMode}
        onCancel={viewModel.onCancel}
        onSave={viewModel.onSave}
        setDisplayMode={viewModel.setDisplayMode}
      >
        <div className={styles.eventDefinitionDetails}>
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

          <Toolbar className={styles.buttonContainer}>
            {renderButton(colors.colorPrimaryLight, styles.button0)}
            {renderButton(colors.colorPrimary, styles.button1)}
            {renderButton(colors.colorPrimaryDark, styles.button2)}
            {renderButton(colors.colorSecondaryLight, styles.button3)}
            {renderButton(colors.colorSecondary, styles.button4)}
          </Toolbar>
        </div>
      </ChangeableForm>
    </DetailView>
  );
};
