import { useEffect, useRef, useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';

import { ValidationsWrapper } from '@shared/components/validations_wrapper';

import style from './multipleSearchSelect.module.scss';

export const MultipleSearchSelect = ({
  formSelectors,
  fieldParams,
  onSearch,
  defOptions,
  optionsMapper = (option) => option,
  testid,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(defOptions ?? []);
  const [loading, setLoading] = useState(false);

  const values = formSelectors.useFormDataValue(fieldParams.name);
  const setValues = formSelectors.useSetFormDataValue(fieldParams.name);
  const validations = formSelectors.useFormValueValidation(fieldParams.name) ?? [];

  const timeoutId = useRef(null);

  const handleSearch = (query) => {
    onSearch(query ?? null)
      .then((res) => {
        if (res) {
          setLoading(false);
          setOptions(res.map(optionsMapper));
        } else {
          setOptions([]);
        }
      })
      .catch((err) => {
        console.log('search multi select error', err?.response ?? err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!onSearch) return;
    handleSearch();
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const onInputChange = (event, newValue) => {
    setInputValue(newValue);
    if (onSearch) {
      setLoading(true);
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      const timeout = setTimeout(() => {
        handleSearch(newValue);

        timeoutId.current = null;
      }, 300);

      timeoutId.current = timeout;
    }
  };

  const renderInput = (params) => {
    const prop = {
      ...params,
      inputProps: {
        ...params.inputProps,
        'data-testid': testid,
      },
    };
    return <TextField {...prop} label={fieldParams.label ?? null} error={!!validations.length} />;
  };

  const onChange = (event, newValues) => {
    setValues(newValues);
  };

  const filterOptions = (options) => {
    const currentValues = values.map((value) => value.value);

    return options.filter((option) => !currentValues.includes(option.value));
  };

  const renderOptions = (props, option) => (
    <li {...props} data-testid={`${testid}_${option.label}`}>
      {option.label}
    </li>
  );

  return (
    <div className={style.searchSelect}>
      <ValidationsWrapper validationMsgs={validations}>
        <Autocomplete
          fullWidth
          multiple
          options={!loading ? options : []}
          value={values}
          loading={loading}
          onChange={onChange}
          loadingText={'Загрузка...'}
          filterOptions={filterOptions}
          onInputChange={onInputChange}
          inputValue={inputValue}
          getOptionLabel={(option) => option.label}
          renderOption={renderOptions}
          renderInput={renderInput}
          noOptionsText={'Ничего не найдено'}
        />
      </ValidationsWrapper>
    </div>
  );
};
