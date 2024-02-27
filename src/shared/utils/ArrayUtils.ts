import { isEqual } from 'lodash';

export default class ArrayUtils {
  static includes<T>(array: T[], value: T) {
    const index = array.findIndex((elem) => isEqual(elem, value));
    return index >= 0;
  }
}
