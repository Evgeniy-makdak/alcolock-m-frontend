import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useCarsSelect } from '../hooks/useCarsSelect';

interface CarsSelectProps<T> {
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
  name: keyof T;
  value: Value[];
}

export function CarsSelect<T>({
  testid,
  multiple,
  label,
  error,
  setValueStore,
  value,
  name,
}: CarsSelectProps<T>) {
  const { onChange, onReset, isLoading, carList } = useCarsSelect();
  return (
    <SearchMultipleSelect
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      value={value}
      values={carList}
      setValueStore={setValueStore}
      testid={testid}
      name={name}
      multiple={multiple}
    />
  );
}
