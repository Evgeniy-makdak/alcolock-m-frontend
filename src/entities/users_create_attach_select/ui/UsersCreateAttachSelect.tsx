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

export function UsersCreateAttachSelect<T>(props: UsersCreateAttachSelectProps<T>) {
  const { createdBy, isLoading, onChange, onReset } = useUsersCreateAttachSelect();
  return (
    <SearchMultipleSelect
      onReset={onReset}
      onInputChange={onChange}
      isLoading={isLoading}
      values={createdBy}
      {...props}
    />
  );
}
