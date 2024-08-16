import React from "react";
import styles from "./Block.module.scss";
import { IBlockProps } from "./IBlockProps";

export const Block: React.FC<IBlockProps> = (props) => {
  return (
    <>
      <div
        style={{
          gridColumnStart: props.gridColumnStart,
          gridRowStart: props.gridRowStart,
          gridRowEnd: props.gridRowEnd,
          backgroundColor: props.color,
        }}
      />
      <div
        className={styles.block}
        style={{
          gridColumnStart: props.gridColumnStart + 1,
          gridRowStart: props.gridRowStart,
          gridRowEnd: props.gridRowEnd,
        }}
      >
        <h1 className={styles.title}>{props.title}</h1>
        {props.description && (
          <p className={styles.description}>{props.description}</p>
        )}
        <p className={styles.time}>{`${props.startTime} - ${props.endTime}`}</p>
      </div>
    </>
  );
};
