import type { Value, Values } from '@shared/ui/search_multiple_select';

export const getStringFromArrayValues = (values: (string | Value)[] | Value) => {
  if (Array.isArray(values)) {
    const arr: (number | string)[] = [];
    values.map((item) => {
      if (typeof item === 'string') return;
      arr.push(item.value);
    });
    return arr.join(',').trim();
  }
  return values.value.toString();
};

export const getArrayValues = (values: (string | Value)[] | Value | string): Values => {
  const arr: Values = [];
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

export const getArrayFromValues = (values: (string | Value)[] | Value) => {
  if (Array.isArray(values)) {
    const arr: (number | string)[] = [];
    values.map((item) => {
      if (typeof item === 'string') return;
      arr.push(item.value);
    });
    return arr;
  }
  return [values.value];
};
