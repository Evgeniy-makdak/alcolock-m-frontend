export const getStringFromArrayValues = (values: number[] | number) => {
  if (Array.isArray(values)) {
    return values.join(',').trim();
  }
  return values.toString();
};
