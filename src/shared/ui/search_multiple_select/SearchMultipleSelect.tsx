import { type Path, type UseFormRegister } from 'react-hook-form';

import { Autocomplete, TextField } from '@mui/material';

import { ValidationsWrapper } from '@shared/components/validations_wrapper';
import { debounce } from '@shared/lib/debounce';

import style from './SearchMultipleSelect.module.scss';

export interface Value {
  label: string;
  value: number;
}

interface SearchMultipleSelectProps<T> {
  testid: string;
  error?: boolean;
  textFieldLabel?: string;
  multiple?: boolean;
  loading?: boolean;
  values: Value[];
  validations?: any[];
  name: Path<T>;
  register: UseFormRegister<T>;
  onSelect?: (value: number[] | number) => void;
  onInputChange?: (value: string) => void;
  onReset?: () => void;
}

export function SearchMultipleSelect<T>({
  testid,
  textFieldLabel,
  error,
  loading,
  validations,
  onReset,
  values,
  multiple,
  name,
  register,
  onSelect,
  onInputChange,
}: SearchMultipleSelectProps<T>) {
  const debouncedFunc = debounce(500, onInputChange);
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
          fullWidth
          {...register(name)}
          freeSolo
          multiple={multiple ? true : false}
          options={!loading ? values : []}
          loading={loading}
          onReset={() => console.log('res')}
          onInputChange={(_e, value, reason) => {
            if (reason === 'clear') {
              onReset && onReset();
            }
            if (reason !== 'input') return;
            if (!debouncedFunc) return;
            debouncedFunc(value);
          }}
          onChange={(_e, value) => {
            if (typeof value === 'string') return;
            if (Array.isArray(value)) {
              onSelect(
                value.map((val) => {
                  if (typeof val === 'string') return;
                  return val.value;
                }),
              );
              return;
            }
            onSelect(value?.value);
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
