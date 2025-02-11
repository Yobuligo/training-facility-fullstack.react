import { Value } from "../../core/types/Value";

/**
 * This interface represents a memento object.
 */
export interface IMemento<T> {
  /**
   * Provides access to the current value.
   */
  readonly value: T;

  /**
   * Applies the changes and updates the snapshot with the current {@link value}.
   */
  apply(): void;

  /**
   * Overrides the current changes and the snapshot by {@link newValue}. So withdraws any changes.
   */
  override(newValue: T): void;

  /**
   * Restores the {@link value} by the last snapshot.
   */
  restore(): void;

  /**
   * Updates the current {@link value}.
   * These changes can be undone by method {@link restore}.
   */
  setValue(newValue: T): void;

  /**
   * Returns {@link value} and {@link setValue} as tuple of type {@link Value}.
   */
  toValue(): Value<T>;
}
