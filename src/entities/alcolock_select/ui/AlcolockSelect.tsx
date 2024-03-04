import type { ID } from '@shared/types/BaseQueryTypes';
import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useAlcolockSelect } from '../hooks/useAlcolockSelect';

interface AlcolockSelectProps<T> {
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  value: Value[];
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  name: keyof T;
  vieBranch?: boolean;
  branchId?: ID;
  notInBranch?: ID;
}

export function AlcolockSelect<T>({
  setValueStore,
  error,
  label,
  multiple,
  value,
  testid,
  name,
  vieBranch,
  branchId,
  notInBranch,
}: AlcolockSelectProps<T>) {
  const { onChange, isLoading, onReset, alcolockList } = useAlcolockSelect(
    vieBranch,
    branchId,
    notInBranch,
  );

  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={alcolockList}
      setValueStore={setValueStore}
      testid={testid}
      value={value}
      name={name}
      multiple={multiple}
    />
  );
}
