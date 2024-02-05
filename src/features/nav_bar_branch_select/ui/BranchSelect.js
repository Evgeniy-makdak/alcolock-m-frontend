import { useEffect, useRef, useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';

import { testids } from '@shared/const/testid';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { selectedBranchStore } from '@shared/model/selected_branch/store';

import { searchGroups } from '../../../pages/groups/model/effects';
import style from './BranchSelect.module.scss';

const valueFormatter = (value) => {
  return value
    ? {
        value: value,
        label: value.name,
      }
    : null;
};
export const BranchSelect = () => {
  const [selectedBranch, setSelectedBranch] = selectedBranchStore.selectedBranch.useState();
  const { state: office, setItemState: setOffice } = useLocalStorage({
    key: 'office',
    value: selectedBranch,
  });
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const timeoutId = useRef(null);

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
    if (office) {
      setSelectedBranch(office);
    }

    setOptions([]);
    handleSearch();
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const onChange = (_event, option) => {
    const office = options.find((item) => item.value.id === option?.value?.id);
    if (!office) {
      return;
    }
    setOffice(option?.value);
    setSelectedBranch(option?.value ?? null);
  };

  const renderInput = (params) => {
    const prop = {
      ...params,
      inputProps: {
        ...params.inputProps,
        'data-testid': testids.widget_navbar.NAVBAR_INPUT_CHOOSE_FILIAL_INPUT,
      },
    };

    return <TextField {...prop} label={'Выбранный филиал'} />;
  };

  const renderOptions = (props, option) => (
    <li
      {...props}
      data-testid={`${testids.widget_navbar.NAVBAR_INPUT_CHOOSE_FILIAL_OPEN_LIST_ITEM}_${option.label}`}>
      {option.label}
    </li>
  );

  return (
    <div className={style.branchSelect}>
      <Autocomplete
        fullWidth
        noOptionsText={'Ничего не найдено'}
        loadingText={'Загрузка...'}
        options={loading ? [] : options}
        value={value}
        loading={loading}
        onChange={onChange}
        renderOption={renderOptions}
        renderInput={renderInput}
      />
    </div>
  );
};
