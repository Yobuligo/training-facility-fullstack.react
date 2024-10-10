import { EventInstanceItem } from "../eventInstanceItem/EventInstanceItem";
import styles from "./EventInstanceItemAligned.module.scss";
import { IEventInstanceItemAlignedProps } from "./IEventInstanceItemAlignedProps";

/**
 * This component is responsible for rendering an {@link EventInstanceItem} and align the children to the bottom, right side.
 */
export const EventInstanceItemAligned: React.FC<
  IEventInstanceItemAlignedProps
> = (props) => {
  return (
    <EventInstanceItem {...props} classNameChildren={styles.children}>
      {props.children}
    </EventInstanceItem>
  );
};
