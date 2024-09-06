export interface ISearchProps {
  displaySpinner?: boolean;
  inputClassName?: string;
  onSearch?: (query: string) => void;
  query?: string;
}
