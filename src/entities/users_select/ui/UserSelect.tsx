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
  setValueStore,
}: UsersSelectProps<T>) {
  const { onChange, isLoading, onReset, driversList } = useUserSelect();
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
