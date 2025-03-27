import colors from "../../styles/colors.module.scss";

export const useRenderChartColor = () => {
  const renderColor = (index: number): string => {
    switch (index) {
      case 0:
        return colors.colorChart1;
      case 1:
        return colors.colorChart2;
      case 2:
        return colors.colorChart3;
      case 3:
        return colors.colorChart4;
      case 4:
        return colors.colorChart5;
      case 5:
        return colors.colorChart6;
      case 6:
        return colors.colorChart7;
      case 7:
        return colors.colorChart8;

        case 8: 
        return "blue";
        case 9: return "red"
        case 10: return "yellow"
      default:
        throw new Error(
          "Error while rendering color. No more colors available."
        );
    }
  };

  return renderColor;
};
