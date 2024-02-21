import type { Value } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

export const arraysHasLength = (arrays: Value[][]) => {
  let hasLength = false;
  arrays.map((array) => {
    if (array.length > 0) {
      hasLength = true;
    }
  });
  return hasLength;
};
