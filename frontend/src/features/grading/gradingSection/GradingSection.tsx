import { Spinner } from "../../../components/spinner/Spinner";
import { GradingList } from "../gradingList/GradingList";
import styles from "./GradingSection.module.scss";
import { IGradingSectionProps } from "./IGradingSectionProps";
import { useGradingSectionViewModel } from "./useGradingSectionViewModel";

export const GradingSection: React.FC<IGradingSectionProps> = (props) => {
  const viewModel = useGradingSectionViewModel(props);

  return (
    <div className={styles.gradingSection}>
      {viewModel.isLoading ? (
        <Spinner />
      ) : (
        <GradingList gradings={viewModel.gradings} />
      )}
    </div>
  );
};
