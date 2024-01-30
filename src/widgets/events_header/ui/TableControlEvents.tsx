/* eslint-disable no-empty-pattern */
import { TableControlWrapper } from '@shared/components/table_control_wrapper/TableControlWrapper';

// import React, { ReactNode, useState } from 'react';

// import { createTheme } from '@mui/material';

// import { useToggle } from '@shared/hooks/useToggle';

// const theme = createTheme({
//   components: {
//     MuiOutlinedInput: {
//       styleOverrides: {
//         input: {
//           padding: '10px 14px',
//         },
//         notchedOutline: {
//           borderWidth: '2px',
//         },
//         root: {
//           height: '30px',
//           display: 'flex',
//           alignItems: 'center',
//         },
//       },
//     },
//   },
// });

interface TableControlProps {
  // onSearch: () => void;
  // isFiltersActive: boolean;
  // search: (value: string, startDate: string, endDate: string) => void;
  // margin?: string;
  // tableControlTestId?: { inputStart?: string; inputEnd?: string };
}

export const TableControlEvents = (
  {
    // onSearch,
    // withSearch,
    // withDate,
    // isFiltersActive,
  }: TableControlProps,
) => {
  return (
    <TableControlWrapper>
      <>
        {/* <div className={`${style.tableControl} ${margin}`}>
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
              data-testid={tableControlTestId && tableControlTestId?.inputStart}
              type={'date'}
              onChange={onChangeStartDate}
              value={startDate}
              max={endDate ? endDate : maxDate}
            />

            <input
              data-testid={tableControlTestId && tableControlTestId?.inputEnd}
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

      {isOpenFilters && filtersPanel} */}
      </>
    </TableControlWrapper>
  );
};
