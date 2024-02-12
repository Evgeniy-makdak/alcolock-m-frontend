import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useUsersCreateAttachSelect } from '../hooks/useUsersCreateAttachSelect';

interface UsersCreateAttachSelectProps<T> {
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  value: Value[];
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  name: keyof T;
}

export function UsersCreateAttachSelect<T>({
  setValueStore,
  value,
  testid,
  multiple = true,
  label,
  error,
  name,
}: UsersCreateAttachSelectProps<T>) {
  const { createdBy, isLoading, onChange, onReset } = useUsersCreateAttachSelect();
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={createdBy}
      setValueStore={setValueStore}
      value={value}
      testid={testid}
      name={name}
      multiple={multiple}
    />
  );
}
