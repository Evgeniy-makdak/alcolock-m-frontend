import type { Path, UseFormRegister } from 'react-hook-form';

import { SearchMultipleSelect } from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useCarsSelect } from '../hooks/useCarsSelect';

interface CarsSelectProps<T> {
  onSelectCar: (value: number[] | number) => void;
  register: UseFormRegister<T>;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
}

export function CarsSelect<T>({
  onSelectCar,
  register,
  testid,
  multiple,
  label,
  error,
}: CarsSelectProps<T>) {
  const { onChange, onReset, isLoading, carList } = useCarsSelect();
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={carList}
      onSelect={onSelectCar}
      register={register}
      testid={testid}
      name={'carId' as Path<T>}
      multiple={typeof multiple === 'undefined' ? true : multiple}
    />
  );
}
