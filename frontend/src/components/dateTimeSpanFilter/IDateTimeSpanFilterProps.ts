export interface IDateTimeSpanFilterProps {
  fromDate?: Date;
  isLoading?: boolean;
  onChange?: (from: Date, to: Date) => void;
  onApply?: () => void;
  toDate?: Date;
}
