export interface ISearchProps {
  className?: string;
  displaySpinner?: boolean;
  inputClassName?: string;
  onSearch?: (query: string) => void;
  query?: string;
  searchImplicit?: boolean;
}
