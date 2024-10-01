export interface IDateTimeSpanFilterProps {
  fromDate?: Date;
  onChange?: (from: Date, to: Date) => void;
  onApply?: () => void;
  toDate?: Date;
}
