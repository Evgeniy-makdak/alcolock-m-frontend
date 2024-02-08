import type { Path, UseFormRegister } from 'react-hook-form';

import { SearchMultipleSelect } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useAlcolockSelect } from '../hooks/useAlcolockSelect';

interface AlcolockSelectProps<T> {
  onSelectAlcolock: (value: number[] | number) => void;
  register: UseFormRegister<T>;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
}

export function AlcolockSelect<T>({
  onSelectAlcolock,
  register,
  error,
  label,
  multiple,
  testid,
}: AlcolockSelectProps<T>) {
  const { onChange, isLoading, onReset, alcolockList } = useAlcolockSelect();
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={alcolockList}
      onSelect={onSelectAlcolock}
      register={register}
      testid={testid}
      name={'alcolocks' as Path<T>}
      multiple={multiple ? false : true}
    />
  );
}
