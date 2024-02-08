import type { Path, UseFormRegister } from 'react-hook-form';

import { SearchMultipleSelect } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useUsersCreateAttachSelect } from '../hooks/useUsersCreateAttachSelect';

interface UsersCreateAttachSelectProps<T> {
  onSelectUserCreateAttach: (value: number[] | number) => void;
  register: UseFormRegister<T>;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
}

export function UsersCreateAttachSelect<T>({
  onSelectUserCreateAttach,
  register,
  testid,
  multiple = true,
  label,
  error,
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
      onSelect={onSelectUserCreateAttach}
      register={register}
      testid={testid}
      name={'createLink' as Path<T>}
      multiple={multiple}
    />
  );
}
