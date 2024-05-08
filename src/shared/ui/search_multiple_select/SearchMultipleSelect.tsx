import type React from 'react';

import {
  Autocomplete,
  type AutocompleteInputChangeReason,
  type AutocompleteProps,
  type AutocompleteRenderInputParams,
  TextField,
  createFilterOptions,
} from '@mui/material';

import { debounce } from '@shared/lib/debounce';

import style from './SearchMultipleSelect.module.scss';
import {
  type OnChane,
  type Value,
  type Values,
  isOptionEqualToValue,
  renderOptions,
} from './helpers';

export type SearchMultipleSelectProps<T> = {
  testid?: string;
  error?: boolean;
  label?: string;
  isLoading?: boolean;
  values: Values;
  name: keyof T | string;
  value?: Values;
  onSelect?: (value: number[] | number) => void;
  onInputChange?: (value: string) => void;
  onReset?: () => void;
  setValueStore?: (
    type: keyof T | string,
    value: string | Values | Value | (string | Values | Value)[],
  ) => void;
  helperText?: string;
  serverFilter?: boolean;
} & Partial<
  Omit<AutocompleteProps<Value, boolean, boolean, boolean>, 'onInputChange' | 'value' | 'name'>
>;

export function SearchMultipleSelect<T>({
  testid,
  label,
  error,
  isLoading,
  onReset,
  values,
  value = [],
  multiple,
  name,
  helperText,
  setValueStore,
  onInputChange,
  serverFilter = true,
  ...rest
}: SearchMultipleSelectProps<T>) {
  const debouncedFunc = debounce({ time: 500, callBack: onInputChange });

  const renderInput = (params: AutocompleteRenderInputParams) => {
    const prop = {
      ...params,
      inputProps: {
        ...params.inputProps,
        'data-testid': testid,
      },
    };
    return <TextField helperText={helperText} {...prop} label={label} error={error} />;
  };

  const onInputChangeHandler = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (reason === 'clear') {
      onReset && onReset();
    }
    if (reason !== 'input') return;
    if (!debouncedFunc) return;

    debouncedFunc(value);
  };

  const onChange: OnChane = (_event, value, reason) => {
    setValueStore(name, value);
    if (reason === 'selectOption') {
      onReset && onReset();
    }
  };

  const matchValue = multiple ? value : values.find((op) => op.value === value[0]?.value);

  const readyValues = matchValue || multiple ? values : [...value, ...values];

  const readyValue =
    multiple || matchValue ? matchValue : readyValues.find((op) => op.value === value[0]?.value);

  return (
    <div className={style.searchSelect}>
      <Autocomplete
        {...rest}
        multiple={multiple}
        onChange={onChange}
        fullWidth
        freeSolo
        value={readyValue || null}
        isOptionEqualToValue={isOptionEqualToValue}
        options={!isLoading ? readyValues : []}
        loading={isLoading}
        filterOptions={serverFilter ? (op) => op : createFilterOptions()}
        onInputChange={onInputChangeHandler}
        loadingText={'Загрузка...'}
        renderOption={(props, option) => renderOptions(props, option as Value, testid)}
        renderInput={renderInput}
        noOptionsText={'Ничего не найдено'}
      />
    </div>
  );
}
