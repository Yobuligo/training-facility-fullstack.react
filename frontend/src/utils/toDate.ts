const addLeadingZero = (value: string): string => {
  if (value.length === 1) {
    return `0${value}`;
  } else {
    return value;
  }
};

export const toDate = (date: Date): string => {
  const [day, month, year] = date.toLocaleDateString().split(".");
  return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`;
};
