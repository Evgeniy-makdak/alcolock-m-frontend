import type { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material';

import type { ID } from '@shared/types/BaseQueryTypes';

export interface Value {
  label: string;
  value: ID;
}

export type Values = Value[];

export const isOptionEqualToValue = (option: Value | Values, value: Value | Values) => {
  if (!Array.isArray(option) && !Array.isArray(value)) return option.value === value.value;
};

export const renderOptions = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: Value,
  testid: string,
) => (
  <li {...props} key={option.value} data-testid={`${testid}_${option.label}`}>
    {option.label}
  </li>
);

export type OnChane = (
  event: React.SyntheticEvent<Element, Event>,
  value: string | Value | Values | (string | Value | Values)[],
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any>,
) => void;

export function mapOptions<T>(
  values: T[],
  adapter: (data: T) => [] | [string, number | string],
): Values {
  if (!Array.isArray(values)) return [];
  const readyArr: Values = [];
  values.map((data) => {
    const vals = adapter(data);

    if (!vals.length) return;
    const [label, value] = vals;
    readyArr.push({
      label,
      value,
    });
  });
  return readyArr;
}
