import type { ID } from '@shared/types/BaseQueryTypes';
import { SearchMultipleSelect, type Value, type Values } from '@shared/ui/search_multiple_select';

import { useBranchSelect } from '../hooks/useBranchSelect';

type BranchSelectProps<T> = {
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  name: keyof T;
  value: Values;
  filter?: ID;
};

export function BranchSelect<T>({ filter, ...rest }: BranchSelectProps<T>) {
  const { onChange, onReset, isLoading, branchList } = useBranchSelect(filter);
  return (
    <SearchMultipleSelect
      onReset={onReset}
      onInputChange={onChange}
      isLoading={isLoading}
      values={branchList}
      {...rest}
    />
  );
}
