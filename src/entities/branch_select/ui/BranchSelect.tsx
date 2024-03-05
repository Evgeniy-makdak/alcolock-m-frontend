import type { ID } from '@shared/types/BaseQueryTypes';
import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useBranchSelect } from '../hooks/useBranchSelect';

type BranchSelectProps<T> = {
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  name: keyof T;
  value: Value[];
  filter?: ID;
};

export function BranchSelect<T>({
  testid,
  multiple,
  label,
  error,
  setValueStore,
  value,
  name,
  filter,
}: BranchSelectProps<T>) {
  const { onChange, onReset, isLoading, branchList } = useBranchSelect(filter);
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      value={value}
      values={branchList}
      setValueStore={setValueStore}
      testid={testid}
      name={name}
      multiple={multiple}
    />
  );
}
