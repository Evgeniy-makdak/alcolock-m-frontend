import { useEffect, useRef, useState } from 'react';

import { isEqual } from 'lodash';

import { Autocomplete, TextField } from '@mui/material';

import { ValidationsWrapper } from '@shared/components/validations_wrapper';

import { InputWrapper } from '../../styled_components/styledInputWrapper';

export const SearchSelect = ({
  formSelectors,
  fieldParams,
  defOptions,
  valueFormatter = (item) => item,
  onSearch,
  testid,
}) => {
  const value = formSelectors.useFormDataValue(fieldParams.name);
  const setValue = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name) ?? [];
  const [options, setOptions] = useState(defOptions ?? []);
  const [loading, setLoading] = useState(false);
  const timeoutId = useRef(null);
  const option = valueFormatter(value);

  const handleSearch = (query) => {
    onSearch(query ?? null)
      .then((res) => {
        if (res) {
          setLoading(false);
          setOptions(res);
        } else {
          setOptions([]);
        }
      })
      .catch((err) => {
        console.log('search select error', err?.response ?? err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!onSearch) return;
    setLoading(true);
    setOptions([]);
    handleSearch();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const onChange = (event, option) => {
    setValue(option?.value ?? null);
  };

  const onInputChange = (event, newValue) => {
    if (!onSearch) return;
    setLoading(true);
    setOptions([]);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const timeout = setTimeout(() => {
      handleSearch(newValue);

      timeoutId.current = null;
    }, 300);

    timeoutId.current = timeout;
  };

  const filterOptions = (options, value) => {
    return options.filter((item) => {
      return (
        !isEqual(item.value, option?.value) &&
        (item?.label.toLowerCase().includes(value.inputValue?.toLowerCase().trim()) ?? true)
      );
    });
  };

  const isOptionEqualToValue = (option, value) => {
    return isEqual(option.value, value?.value);
  };
  return (
    <InputWrapper>
      <ValidationsWrapper validationMsgs={validations}>
        <Autocomplete
          fullWidth
          options={options}
          onChange={onChange}
          value={option}
          loading={loading}
          onInputChange={onInputChange}
          noOptionsText={'Ничего не найдено'}
          loadingText={'Загрузка...'}
          filterOptions={filterOptions}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => {
            return (
              <TextField
                data-testid={testid}
                {...params}
                label={fieldParams.label ?? ''}
                error={!!validations.length}
              />
            );
          }}
        />
      </ValidationsWrapper>
    </InputWrapper>
  );
};
