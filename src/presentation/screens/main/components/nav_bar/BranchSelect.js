import { isEqual } from 'lodash';

import { useEffect, useRef, useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';

import { searchGroups } from '../../../../../internal/effector/groups/effects';
import { selectedBranchStore } from '../../../../../internal/effector/selected_branch/store';
import './BranchSelect.sass';

const BranchSelect = () => {
  const [selectedBranch, setSelectedBranch] = selectedBranchStore.selectedBranch.useState();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const timeoutId = useRef(null);

  const valueFormatter = (value) => {
    return value
      ? {
          value: value,
          label: value.name,
        }
      : null;
  };
  const value = valueFormatter(selectedBranch);

  const handleSearch = (query) => {
    searchGroups(query ?? '')
      .then((res) => {
        setOptions(res.map((item) => ({ value: item, label: item.name })));
        setLoading(false);
      })
      .catch((err) => {
        console.log('BranchSelect error', err?.response);
        setOptions([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setOptions([]);
    handleSearch();
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const filterOptions = (options, value) => {
    return options.filter((item) => {
      return (
        !isEqual(item.value, value?.value) &&
        (item?.label.toLowerCase().includes(value.inputValue?.toLowerCase().trim()) ?? true)
      );
    });
  };

  const isOptionEqualToValue = (option, value) => {
    return isEqual(option.value, value?.value);
  };

  const onInputChange = (event, newValue) => {
    setLoading(true);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    const timeout = setTimeout(() => {
      handleSearch(newValue);

      timeoutId.current = null;
    }, 300);

    timeoutId.current = timeout;
  };

  const onChange = (event, option) => {
    setSelectedBranch(option?.value ?? null);
  };

  const onBlur = () => {
    if (selectedBranch) return;
    setSelectedBranch({
      id: 10,
      name: 'Система',
    });
  };

  return (
    <div className={'branch-select'}>
      <Autocomplete
        fullWidth
        noOptionsText={'Ничего не найдено'}
        loadingText={'Загрузка...'}
        onBlur={onBlur}
        options={loading ? [] : options}
        value={value}
        loading={loading}
        onChange={onChange}
        onInputChange={onInputChange}
        filterOptions={filterOptions}
        isOptionEqualToValue={isOptionEqualToValue}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => {
          return <TextField {...params} label={'Выбранный филиал'} />;
        }}
      />
    </div>
  );
};

export default BranchSelect;
