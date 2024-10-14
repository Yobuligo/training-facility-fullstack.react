export type UseLabeledElement<T> = [
  value: T,
  updateValue: React.Dispatch<React.SetStateAction<T>>,
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>
];
