import type { ID } from '@shared/types/BaseQueryTypes';
import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useUserSelect } from '../hooks/useUserSelect';

interface UsersSelectProps<T> {
  onSelectDriver?: (value: number[] | number) => void;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  name: keyof T;
  value?: Value[];
  vieBranch?: boolean;
  branchId?: ID;
  notInBranch?: ID;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
}

export function UsersSelect<T>({
  vieBranch,
  branchId,
  notInBranch,
  onSelectDriver,
  ...rest
}: UsersSelectProps<T>) {
  const { onChange, isLoading, onReset, driversList } = useUserSelect(
    vieBranch,
    branchId,
    notInBranch,
  );
  return (
    <SearchMultipleSelect
      onReset={onReset}
      onInputChange={onChange}
      isLoading={isLoading}
      values={driversList}
      onSelect={onSelectDriver}
      {...rest}
    />
  );
}
