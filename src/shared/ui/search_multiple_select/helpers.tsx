import type { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material';

import type { Permissions } from '@shared/const/config';
import type { ID } from '@shared/types/BaseQueryTypes';

export interface Value {
  label: string;
  value: ID;
  permissions?: Permissions[] | [] | null | undefined;
}

export type Values = Value[];

export const isOptionEqualToValue = (option: Value | Values, value: Value | Values) => {
  if (!Array.isArray(option) && !Array.isArray(value)) return option.value === value.value;
};
export type AdapterReturn = [string, ID] | [string, ID, Permissions[] | [] | undefined | null] | [];

export const renderOptions = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: Value,
  testid: string,
) => (
  <li {...props} key={option.value?.toString()} data-testid={`${testid}_${option.label}`}>
    {option.label}
  </li>
);

export type OnChane = (
  event: React.SyntheticEvent<Element, Event>,
  value: string | Value | Values | (string | Value | Values)[],
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails,
) => void;

export function mapOptions<T>(values: T[], adapter: (data: T) => AdapterReturn): Values {
  if (!Array.isArray(values)) return [];
  const readyArr: Values = [];
  values.map((data) => {
    const vals = adapter(data);

    if (!vals.length) return;
    const [label, value, permissions] = vals;
    readyArr.push({
      label,
      value,
      permissions,
    });
  });
  return readyArr;
}
