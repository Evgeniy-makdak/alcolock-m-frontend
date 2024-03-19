import { isEqual } from 'lodash';

import type { ID } from '@shared/types/BaseQueryTypes';
import type { Value, Values } from '@shared/ui/search_multiple_select';

export default class ArrayUtils {
  static includes<T>(array: T[], value: T) {
    const index = array.findIndex((elem) => isEqual(elem, value));
    return index >= 0;
  }

  static getStringFromArrayValues(values: (string | Value)[] | Value) {
    if (Array.isArray(values)) {
      const arr: ID[] = [];
      values.map((item) => {
        if (typeof item === 'string') return;
        arr.push(item.value);
      });
      return arr.join(',').trim();
    }
    return values.value;
  }

  static getArrayValues(values: (string | Value)[] | Value | string): Values {
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
  }

  static getArrayFromValues(values: (string | Value)[] | Value): ID[] {
    if (Array.isArray(values)) {
      const arr: ID[] = [];
      values.map((item) => {
        if (typeof item === 'string') return;
        arr.push(item.value);
      });
      return arr;
    }
    return [values.value];
  }
}
