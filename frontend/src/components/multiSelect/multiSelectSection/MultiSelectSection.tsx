import { style } from "../../../core/ui/style";
import { MultiSelectList } from "../multiSelectList/MultiSelectList";
import { IMultiSelectSectionProps } from "./IMultiSelectSectionProps";
import styles from "./MultiSelectSection.module.scss";

export function MultiSelectSection<T>(props: IMultiSelectSectionProps<T>) {
  return (
    <div className={style(styles.multiSelectSection, props.className)}>
      {props.label && <h3 className={styles.title}>{props.label}</h3>}
      <MultiSelectList
        disabled={props.disabled}
        onChange={props.onChange}
        options={props.options}
        selected={props.selected}
      />
    </div>
  );
}
