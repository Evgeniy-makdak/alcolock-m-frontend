import {
  SearchMultipleSelect,
  type Value,
} from '@shared/ui/search_multiple_select/SearchMultipleSelect';

import { useTypeEventSelect } from '../hooks/useTypeEventSelect';

interface TypeEventSelectProps<T> {
  onSelect?: (value: number[] | number) => void;
  testid?: string;
  multiple?: boolean;
  label?: string;
  error?: boolean;
  name: keyof T;
  value?: Value[];
  setValueStore?: (type: keyof T, value: string | Value | (string | Value)[]) => void;
}

export function TypeEventSelect<T>({
  onSelect,
  testid,
  multiple,
  label,
  error,
  value,
  name,
  setValueStore,
}: TypeEventSelectProps<T>) {
  const { marksCarList } = useTypeEventSelect();
  return (
    <SearchMultipleSelect
      setValueStore={setValueStore}
      error={error}
      textFieldLabel={label}
      values={marksCarList}
      onSelect={onSelect}
      testid={testid}
      name={name}
      multiple={multiple}
      value={value}
    />
  );
}
