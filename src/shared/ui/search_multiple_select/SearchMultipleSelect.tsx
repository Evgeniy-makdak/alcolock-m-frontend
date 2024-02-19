import { type Control } from 'react-hook-form';

import { Autocomplete, TextField } from '@mui/material';

import { ValidationsWrapper } from '@shared/components/validations_wrapper';
import { debounce } from '@shared/lib/debounce';

import style from './SearchMultipleSelect.module.scss';

export interface Value {
  label: string;
  value: number | string;
}

export function mapOptions<T>(
  values: T[],
  adapter: (data: T) => [] | [string, number | string],
): Value[] {
  if (!Array.isArray(values)) return [];
  const readyArr: Value[] = [];
  values.map((data) => {
    const vals = adapter(data);

    if (!vals.length) return;
    const [label, value] = vals;
    readyArr.push({
      label,
      value,
    });
  });
  return readyArr;
}

interface SearchMultipleSelectProps<T> {
  testid: string;
  error?: boolean;
  textFieldLabel?: string;
  multiple?: boolean;
  loading?: boolean;
  values: Value[];
  validations?: any[];
  name: keyof T;
  register?: any;
  value?: Value[];
  onSelect?: (value: number[] | number) => void;
  onInputChange?: (value: string) => void;
  onReset?: () => void;
  control?: Control<T, any>;
  setValueStore?: (
    type: keyof T,
    value: string | Value | Value[] | (string | Value | Value[])[],
  ) => void;
  inputValue?: string;
}

export function SearchMultipleSelect<T>({
  testid,
  textFieldLabel,
  error,
  loading,
  validations,
  onReset,
  values,
  value = [],
  inputValue,
  multiple,
  name,
  setValueStore,
  onInputChange,
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
    return <TextField {...prop} label={textFieldLabel} error={error} />;
  };

  const renderOptions = (props: React.HTMLAttributes<HTMLLIElement>, option: Value) => (
    <li {...props} data-testid={`${testid}_${option.label}`}>
      {option.label}
    </li>
  );
  return (
    <div className={style.searchSelect}>
      <ValidationsWrapper validationMsgs={validations ? validations : []}>
        <Autocomplete
          value={multiple ? value : values.find((op) => op.value === value[0]?.value)}
          fullWidth
          freeSolo
          multiple={multiple}
          isOptionEqualToValue={(option, value) => {
            if (!Array.isArray(option) && !Array.isArray(value))
              return option.value === value.value;
          }}
          options={values}
          loading={loading}
          inputValue={inputValue}
          onInputChange={(_e, value, reason) => {
            if (reason === 'clear') {
              onReset && onReset();
            }
            if (reason !== 'input') return;
            if (!debouncedFunc) return;
            debouncedFunc(value);
          }}
          onChange={(_e, value, reson) => {
            setValueStore(name, value);
            if (reson === 'selectOption') {
              onReset && onReset();
            }
          }}
          loadingText={'Загрузка...'}
          renderOption={renderOptions}
          renderInput={renderInput}
          noOptionsText={'Ничего не найдено'}
        />
      </ValidationsWrapper>
    </div>
  );
}
