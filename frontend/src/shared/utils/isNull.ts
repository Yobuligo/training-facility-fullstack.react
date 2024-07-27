export const isNull = (object: any): boolean => {
  if (object !== undefined && object !== null) {
    return false;
  }
  return true;
};
