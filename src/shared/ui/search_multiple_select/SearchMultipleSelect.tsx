import type React from 'react';
import { type Control } from 'react-hook-form';

import {
  Autocomplete,
  type AutocompleteInputChangeReason,
  TextField,
  createFilterOptions,
} from '@mui/material';

import { ValidationsWrapper } from '@shared/components/validations_wrapper';
import { debounce } from '@shared/lib/debounce';

import style from './SearchMultipleSelect.module.scss';
import {
  type OnChane,
  type Value,
  type Values,
  isOptionEqualToValue,
  renderOptions,
} from './helpers';

export interface SearchMultipleSelectProps<T> {
  testid?: string;
  error?: boolean;
  label?: string;
  multiple?: boolean;
  isLoading?: boolean;
  values: Values;
  validations?: any[];
  name: keyof T;
  value?: Values;
  onSelect?: (value: number[] | number) => void;
  onInputChange?: (value: string) => void;
  onReset?: () => void;
  control?: Control<T, any>;
  setValueStore?: (
    type: keyof T,
    value: string | Values | Value | (string | Values | Value)[],
  ) => void;
  inputValue?: string;
  helperText?: string;
  serverFilter?: boolean;
}

export function SearchMultipleSelect<T>({
  testid,
  label,
  error,
  isLoading,
  validations,
  onReset,
  values,
  value = [],
  inputValue,
  multiple,
  name,
  helperText,
  setValueStore,
  onInputChange,
  serverFilter = true,
}: SearchMultipleSelectProps<T>) {
  const debouncedFunc = debounce({ time: 500, callBack: onInputChange });

  const renderInput = (params: any) => {
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
      <ValidationsWrapper validationMsgs={validations ? validations : []}>
        <Autocomplete
          value={readyValue || null}
          fullWidth
          freeSolo
          multiple={multiple}
          isOptionEqualToValue={isOptionEqualToValue}
          options={!isLoading ? readyValues : []}
          loading={isLoading}
          filterOptions={serverFilter ? (op) => op : createFilterOptions()}
          inputValue={inputValue}
          onInputChange={onInputChangeHandler}
          onChange={onChange}
          loadingText={'Загрузка...'}
          renderOption={(props, option) => renderOptions(props, option, testid)}
          renderInput={renderInput}
          noOptionsText={'Ничего не найдено'}
        />
      </ValidationsWrapper>
    </div>
  );
}
