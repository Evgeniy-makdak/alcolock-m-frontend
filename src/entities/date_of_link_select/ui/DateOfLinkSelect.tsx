import type { Path, UseFormRegister } from 'react-hook-form';

import { SearchMultipleSelect } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useDateOfLinkSelect } from '../hooks/useDateOfLinkSelect';

interface DateCreateSelectProps<T> {
  onSelectDate: (value: number[] | number) => void;
  register: UseFormRegister<T>;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
}

export function DateOfLinkSelect<T>({
  onSelectDate,
  register,
  testid,
  multiple = true,
  label,
  error,
}: DateCreateSelectProps<T>) {
  const { dateCreate, isLoading, onChange, onReset } = useDateOfLinkSelect();
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={dateCreate}
      onSelect={onSelectDate}
      register={register}
      testid={testid}
      name={'dateLink' as Path<T>}
      multiple={multiple}
    />
  );
}
