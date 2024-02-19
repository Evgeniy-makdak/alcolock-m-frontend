import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useMarksCarSelect } from '../hooks/useMarksCarSelect';

interface MarksCarSelectProps<T> {
  onSelectMarkCar?: (value: number[] | number) => void;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  name: keyof T;
  value?: Value[];
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
}

export function MarksCarSelect<T>({
  onSelectMarkCar,
  testid,
  multiple,
  label,
  error,
  value,
  name,
  setValueStore,
}: MarksCarSelectProps<T>) {
  const { onChange, isLoading, onReset, marksCarList } = useMarksCarSelect();
  return (
    <SearchMultipleSelect
      setValueStore={setValueStore}
      error={error}
      onReset={onReset}
      onInputChange={onChange}
      textFieldLabel={label}
      loading={isLoading}
      values={marksCarList}
      onSelect={onSelectMarkCar}
      testid={testid}
      name={name}
      multiple={multiple}
      value={value}
    />
  );
}
