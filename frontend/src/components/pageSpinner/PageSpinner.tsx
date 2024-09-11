import colors from "../../styles/colors.module.scss";
import { Spinner } from "../spinner/Spinner";

/**
 * This component is responsible for displaying a spinner with the correct color in pages.
 */
export const PageSpinner: React.FC = () => {
  return <Spinner color={colors.colorSecondary} />;
};
