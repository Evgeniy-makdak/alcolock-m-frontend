import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const getStringFromArrayValues = (values: (string | Value)[] | Value) => {
  if (Array.isArray(values)) {
    const arr: number[] = [];
    values.map((item) => {
      if (typeof item === 'string') return;
      arr.push(item.value);
    });
    return arr.join(',').trim();
  }
  return values.value.toString();
};

export const getArrayValues = (values: (string | Value)[] | Value | string): Value[] => {
  const arr: Value[] = [];
  if (typeof values === 'string' || !values) return arr;
  if (Array.isArray(values)) {
    values.map((val) => {
      if (typeof val === 'string') return;
      arr.push(val);
    });
    return arr;
  }
  return [values];
};
