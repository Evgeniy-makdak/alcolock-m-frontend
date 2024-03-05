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
  vieBranch,
  branchId,
  notInBranch,
  ...rest
}: AlcolockSelectProps<T>) {
  const { onChange, isLoading, onReset, alcolockList } = useAlcolockSelect(
    vieBranch,
    branchId,
    notInBranch,
  );

  return (
    <SearchMultipleSelect
      onReset={onReset}
      onInputChange={onChange}
      isLoading={isLoading}
      values={alcolockList}
      {...rest}
    />
  );
}
