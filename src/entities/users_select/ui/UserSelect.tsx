import type { Path, UseFormRegister } from 'react-hook-form';

import { SearchMultipleSelect } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useUserSelect } from '../hooks/useUserSelect';

interface UsersSelectProps<T> {
  onSelectDriver: (value: number[] | number) => void;
  register: UseFormRegister<T>;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
}

export function UsersSelect<T>({
  onSelectDriver,
  register,
  testid,
  multiple = true,
  label,
  error,
}: UsersSelectProps<T>) {
  const { onChange, isLoading, onReset, driversList } = useUserSelect();
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={driversList}
      onSelect={onSelectDriver}
      register={register}
      testid={testid}
      name={'driverId' as Path<T>}
      multiple={multiple}
    />
  );
}
