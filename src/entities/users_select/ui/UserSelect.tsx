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
  sort?: boolean;
  vieBranch?: boolean;
  branchId?: ID;
  notInBranch?: ID;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
}

export function UsersSelect<T>({
  onSelectDriver,
  testid,
  multiple,
  label,
  error,
  value,
  name,
  sort,
  vieBranch,
  setValueStore,
  branchId,
  notInBranch,
}: UsersSelectProps<T>) {
  const { onChange, isLoading, onReset, driversList } = useUserSelect(
    sort,
    vieBranch,
    branchId,
    notInBranch,
  );
  return (
    <SearchMultipleSelect
      setValueStore={setValueStore}
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={driversList}
      onSelect={onSelectDriver}
      testid={testid}
      name={name}
      multiple={multiple}
      value={value}
    />
  );
}
