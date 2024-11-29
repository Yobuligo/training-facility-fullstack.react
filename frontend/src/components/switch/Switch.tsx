import { CSSProperties, useEffect, useState } from "react";
import { style } from "../../core/ui/style";
import colors from "../../styles/colors.module.scss";
import { ISwitchProps } from "./ISwitchProps";
import styles from "./Switch.module.scss";

export const Switch: React.FC<ISwitchProps> = (props) => {
  const [isChecked, setIsChecked] = useState(props.checked ?? false);
  let styling: CSSProperties = {};

  useEffect(() => {
    if (props.checked !== undefined && props.checked !== null) {
      setIsChecked(props.checked);
    }
  }, [props.checked]);

  const addCSSProperty = (cssProperties: object) => {
    styling = { ...styling, ...cssProperties } as CSSProperties;
  };

  props.width && addCSSProperty({ "--switchWidth": props.width });
  props.sliderColor
    ? addCSSProperty({ "--sliderColor": props.sliderColor })
    : addCSSProperty({
        "--sliderColor": props.disabled
          ? colors.colorSliderDisabled
          : colors.colorSlider,
      });
  props.colorOffState
    ? addCSSProperty({ "--colorOffState": props.colorOffState })
    : addCSSProperty({
        "--colorOffState": props.disabled
          ? colors.colorSliderOffStateDisabled
          : colors.colorSliderOffState,
      });
  props.colorOnState
    ? addCSSProperty({ "--colorOnState": props.colorOnState })
    : addCSSProperty({
        "--colorOnState": props.disabled
          ? colors.colorSliderOnStateDisabled
          : colors.colorSliderOnState,
      });

  return (
    <label style={styling} className={style(props.className, styles.switch)}>
      <input
        className={styles.checkbox}
        disabled={props.disabled}
        type="checkbox"
        onChange={(event) => {
          setIsChecked(event.target.checked);
          props.onChange?.(event.target.checked);
        }}
        checked={isChecked}
      />
      <span
        className={style(
          styles.slider,
          styles.round,
          props.disabled ? styles.sliderDisabled : ""
        )}
      ></span>
    </label>
  );
};
