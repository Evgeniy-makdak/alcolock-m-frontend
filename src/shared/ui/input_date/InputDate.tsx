import { useId } from 'react';

import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';

import { MenuItem, type Theme, ThemeProvider, createTheme } from '@mui/material';
import {
  DatePicker,
  type DatePickerProps,
  LocalizationProvider,
  type PickersActionBarProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DATE_FORMAT_FOR_DISPLAYS } from '@shared/const/dateFormat';

interface InputDateProps extends DatePickerProps<Dayjs> {
  testid?: string;
}
dayjs.extend(updateLocale);
dayjs.updateLocale('ru', {
  weekStart: 1,
});

const newTheme = (theme?: Theme) => ({
  ...theme,
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '181px',
          height: '30px',
          backgroundColor: '#f1f1f1',
        },
      },
    },
    MuiPickersSlideTransition: {
      styleOverrides: {
        root: {
          maxHeight: 200,
          minHeight: '150px !important',
          height: 200,
        },
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          height: 'auto',
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          paddingBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 350,
        },
      },
    },
  },
});

const CustomMenuItem = (props: PickersActionBarProps) => {
  const { onClear } = props;
  const id = useId();
  return (
    <MenuItem
      data-mui-test="clear-action-button"
      onClick={() => {
        onClear();
      }}
      style={{
        alignSelf: 'center',
        backgroundColor: '#e6e6e6',
        color: '#1976d2',
        borderRadius: '3px',
      }}
      key={id}>
      Очистить
    </MenuItem>
  );
};

const theme = createTheme(newTheme());

export const InputDate = (props: InputDateProps) => {
  return (
    <LocalizationProvider adapterLocale="ru" dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DatePicker
          {...props}
          slots={{
            actionBar: CustomMenuItem,
          }}
          slotProps={{
            field: { clearable: true },
            actionBar: {
              actions: ['clear'],
              id: `ACTION_BAR`,
            },
            popper: {
              id: `POPER ${props.testid}_POPER`,
            },

            openPickerButton: {
              id: `OPEN_PICKER_BUTTON`,
            },
            nextIconButton: {
              id: `NEXT_ICON_BUTTON`,
            },
            previousIconButton: {
              id: `PREVIOUS_ICON_BUTTON`,
            },
            switchViewButton: {
              id: `SWITCH_VIEW_BUTTON`,
            },
            textField: {
              placeholder: 'ДД.ММ.ГГГГ',
              id: `TEXT_FIELD ${props.testid}_TEXT_FIELD`,
            },
            clearButton: {
              id: `CLEAR_BUTTON`,
            },
          }}
          format={DATE_FORMAT_FOR_DISPLAYS}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
