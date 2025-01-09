import { style } from "../../core/ui/style";
import { TabItem } from "../tabItem/TabItem";
import { ITabItem } from "./ITabItem";
import { ITabStripProps } from "./ITabStripProps";
import styles from "./TabStrip.module.scss";

export function TabStrip<T extends ITabItem>(props: ITabStripProps<T>) {
  const items = props.tabItems.map((tabItem, index) => (
    <TabItem
      key={index}
      onSelect={() => props.onSelect?.(tabItem, index)}
      selected={props.selected === index}
      title={tabItem.title}
    />
  ));

  return (
    <header className={style(styles.header, props.className)}>{items}</header>
  );
}
