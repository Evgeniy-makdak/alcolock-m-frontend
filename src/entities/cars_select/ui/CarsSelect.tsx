import type { ID } from '@shared/types/BaseQueryTypes';
import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useCarsSelect } from '../hooks/useCarsSelect';

interface CarsSelectProps<T> {
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  name: keyof T;
  value: Value[];
  branchId?: ID;
  notInBranch?: ID;
  vieBranch?: boolean;
}

export function CarsSelect<T>({
  testid,
  multiple,
  label,
  error,
  setValueStore,
  value,
  name,
  vieBranch = false,
  branchId,
  notInBranch,
}: CarsSelectProps<T>) {
  const { onChange, onReset, isLoading, carList } = useCarsSelect(vieBranch, branchId, notInBranch);
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      value={value}
      values={carList}
      setValueStore={setValueStore}
      testid={testid}
      name={name}
      multiple={multiple}
    />
  );
}
