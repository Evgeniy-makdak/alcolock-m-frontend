import {createTheme, TextField, ThemeProvider} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {cloneElement, useState} from "react";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {useToggle} from "../../../../../internal/hooks/useToggle";
import SelectedFilterItem from "./SelectedFilterItem";
import FilterButton from "./FilterButton";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover $notchedOutline': {
            borderColor: 'transparent',
          },
          '&$focused $notchedOutline': {
            borderColor: 'transparent',
          },
        },
        notchedOutline: {
          borderWidth: 0,
        },
        input: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
});

const TableControl = (
  {
    search,
    withDate,
    withSearch,
    filtersPanel,
    isFiltersActive
  }) => {
  const [inputValue, setValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOpenFilters, toggleIsOpenFilters] = useToggle(false)

  const currentDate = new Date()
  const maxDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  const onChange = (e) => {
    const value = e.target.value
    setValue(value)
    search(value, startDate, endDate)
  }

  const onClear = () => {
    setValue('')
    search('', startDate, endDate)
  }

  const onChangeStartDate = (e) => {
    const value = e.target.value
    setStartDate(value)
    search(inputValue, value, endDate)
  }

  const onChangeEndDate = (e) => {
    const value = e.target.value
    setEndDate(value)
    search(inputValue, startDate, value)
  }

  const handleOpenFilters = () => {
    toggleIsOpenFilters()
  }

  return (
    <>
      <div
        className={'table-control'}
      >
        {withSearch &&
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
                    <IconButton
                      edge="end"
                      onClick={onClear}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </ThemeProvider>
        }

        {
          withDate &&
          <div className="table-control__date-pickers">
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
        }

        {
          !!filtersPanel &&
          <FilterButton
            open={isOpenFilters}
            toggle={toggleIsOpenFilters}
            active={isFiltersActive}
          />
        }
      </div>

      {
        isOpenFilters && filtersPanel
      }
    </>
  )
}

export default TableControl
