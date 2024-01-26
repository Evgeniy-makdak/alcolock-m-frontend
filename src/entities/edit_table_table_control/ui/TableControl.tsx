import React, { ReactNode, useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useToggle } from '@shared/hooks/useToggle';

import { FilterButton } from '../../edit_table_filter_button';
import style from './TableControl.module.scss';

interface TableControlProps {
  search: (value: string, startDate: string, endDate: string) => void;
  withDate: boolean;
  withSearch: boolean;
  filtersPanel: ReactNode;
  isFiltersActive: boolean;
  margin?: string;
}

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10px 14px',
        },
        notchedOutline: {
          borderWidth: '2px',
        },
        root: {
          height: '30px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
});

export const TableControl = ({
  search,
  withDate,
  withSearch,
  filtersPanel,
  isFiltersActive,
  margin,
}: TableControlProps) => {
  const [inputValue, setValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpenFilters, toggleIsOpenFilters] = useToggle(false);

  const currentDate = new Date();
  const maxDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(
    currentDate.getDate(),
  ).padStart(2, '0')}`;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    search(value, startDate, endDate);
  };

  const onClear = () => {
    setValue('');
    search('', startDate, endDate);
  };

  const onChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartDate(value);
    search(inputValue, value, endDate);
  };

  const onChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndDate(value);
    search(inputValue, startDate, value);
  };

  return (
    <>
      <div className={`${style.tableControl} ${margin}`}>
        {withSearch && (
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              placeholder={'Поиск'}
              value={inputValue}
              variant="outlined"
              onChange={onChange}
              size={'medium'}
              focused={false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={onClear}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </ThemeProvider>
        )}

        {withDate && (
          <div className={style.datePickers}>
            <input
              type={'date'}
              onChange={onChangeStartDate}
              value={startDate}
              max={endDate ? endDate : maxDate}
            />

            <input
              type={'date'}
              onChange={onChangeEndDate}
              value={endDate}
              min={startDate}
              max={maxDate}
            />
          </div>
        )}

        {!!filtersPanel && (
          <FilterButton
            open={isOpenFilters}
            toggle={toggleIsOpenFilters}
            active={isFiltersActive}
          />
        )}
      </div>

      {isOpenFilters && filtersPanel}
    </>
  );
};
