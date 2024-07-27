export const renderDate = (timestamp: Date): string => {
  let [date, right] = timestamp.toString().split("T");
  let [time] = right.split(".");
  return `${date} ${time}`;
};
