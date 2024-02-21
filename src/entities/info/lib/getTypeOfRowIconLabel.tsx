import type { ReactNode } from 'react';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FifteenMpOutlinedIcon from '@mui/icons-material/FifteenMpOutlined';
import Filter4Icon from '@mui/icons-material/Filter4';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import ModelTrainingOutlinedIcon from '@mui/icons-material/ModelTrainingOutlined';
import NumbersIcon from '@mui/icons-material/Numbers';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Chip, type ChipProps } from '@mui/material';

import style from '../ui/Info.module.scss';
import type { GetTypeOfRowIconValueProps } from './getTypeOfRowIconValue';

export enum TypeOfRows {
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  USER = 'USER',
  CAR = 'CAR',
  CODE_ERROR = 'CODE_ERROR',
  ERROR = 'ERROR',
  COORDS = 'COORDS',
  MG_ON_LITER = 'MG_ON_LITER',
  RESULT = 'RESULT',
  BIRTHDAY = 'BIRTHDAY',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  ROLE = 'ROLE',
  ACCESS = 'ACCESS',
  DATE = 'DATE',
  TERM = 'TERM',
  CATEGORY = 'CATEGORY',
  NUMBER_VU = 'NUMBER_VU',
  MARK = 'MARK',
  GOS_NUMBER = 'GOS_NUMBER',
  COLOR = 'COLOR',
  NAMING = 'NAMING',
  MODE = 'MODE',
}

const CustomChipValue = (props: ChipProps) => (
  <Chip className={style.labelText} variant="filled" {...props} />
);

export const summaryExhaleResult = {
  DEVICE_TEST_ERROR_HIGH_CONCENTRATION: (
    <CustomChipValue color="error" label={'Тестирование не пройдено'} />
  ),
  DEVICE_TEST_ERROR_INTERRUPTED: <CustomChipValue color="warning" label="Прерван" />,
  DEVICE_TEST_ERROR_FALSIFICATION: (
    <CustomChipValue color="warning" label={'Фальсификация выдоха'} />
  ),
  FAILED: <CustomChipValue color="error" label={'Нетрезвый'} />,
  PASSED: <CustomChipValue color="success" label={'Трезвый'} />,
};

export type TypeSummaryExhaleResult = keyof typeof summaryExhaleResult;

export interface Field {
  label?: string | number | ReactNode;
  style?: React.CSSProperties;
  value?: GetTypeOfRowIconValueProps | GetTypeOfRowIconValueProps[];
  type?: TypeOfRows;
  summaryExhaleResult?: keyof typeof summaryExhaleResult;
}
type TypeOfRowIconsType = {
  [key in TypeOfRows]: ReactNode;
};

const CustomChip = ({ props }: { props: ChipProps }) => (
  <Chip {...props} className={style.title} variant="outlined" />
);

export const getTypeOfRowIconLabel = (
  type: TypeOfRows,
  label: string | ReactNode | number,
  props?: ChipProps,
) => {
  const readyProps = { ...props, label };
  const TypeOfRowIcons: TypeOfRowIconsType = {
    MODE: CustomChip({
      props: {
        ...readyProps,
        icon: <ModelTrainingOutlinedIcon color="info" />,
      },
    }),
    NAMING: CustomChip({
      props: {
        ...readyProps,
        icon: <DriveFileRenameOutlineOutlinedIcon color="info" />,
      },
    }),
    COLOR: CustomChip({
      props: {
        ...readyProps,
        icon: <ColorLensOutlinedIcon color="info" />,
      },
    }),
    GOS_NUMBER: CustomChip({
      props: {
        ...readyProps,
        icon: <FifteenMpOutlinedIcon color="info" />,
      },
    }),
    MARK: CustomChip({
      props: {
        ...readyProps,
        icon: <CommuteOutlinedIcon color="info" />,
      },
    }),
    NUMBER_VU: CustomChip({
      props: {
        ...readyProps,
        icon: <CoPresentOutlinedIcon color="info" />,
      },
    }),
    SERIAL_NUMBER: CustomChip({
      props: {
        ...readyProps,
        icon: <NumbersIcon color="info" />,
      },
    }),
    USER: CustomChip({
      props: {
        ...readyProps,
        icon: <PersonIcon color="info" />,
      },
    }),
    CAR: CustomChip({
      props: {
        ...readyProps,
        icon: <DirectionsCarOutlinedIcon color="info" />,
      },
    }),
    CODE_ERROR: CustomChip({ props: { ...readyProps, icon: <Filter4Icon color="error" /> } }),
    ERROR: CustomChip({
      props: {
        ...readyProps,
        icon: <ErrorOutlineIcon color="error" />,
      },
    }),
    COORDS: CustomChip({
      props: {
        ...readyProps,
        icon: <MapOutlinedIcon color="info" />,
      },
    }),
    MG_ON_LITER: CustomChip({
      props: {
        ...readyProps,
        icon: <FormatColorFillIcon color={'info'} />,
      },
    }),
    RESULT: CustomChip({
      props: {
        ...readyProps,
        icon: <GppGoodOutlinedIcon color="info" />,
      },
    }),
    BIRTHDAY: CustomChip({
      props: {
        ...readyProps,
        icon: <CakeOutlinedIcon color="info" />,
      },
    }),
    PHONE: CustomChip({
      props: {
        ...readyProps,
        icon: <LocalPhoneOutlinedIcon color="info" />,
      },
    }),
    EMAIL: CustomChip({
      props: {
        ...readyProps,
        icon: <AlternateEmailOutlinedIcon color="info" />,
      },
    }),
    ROLE: CustomChip({
      props: {
        ...readyProps,
        icon: <SupervisorAccountOutlinedIcon color="info" />,
      },
    }),
    ACCESS: CustomChip({
      props: {
        ...readyProps,
        icon: <VpnKeyOutlinedIcon color="info" />,
      },
    }),
    DATE: CustomChip({
      props: {
        ...readyProps,
        icon: <CalendarMonthOutlinedIcon color="info" />,
      },
    }),
    TERM: CustomChip({
      props: {
        ...readyProps,
        icon: <GavelOutlinedIcon color="info" />,
      },
    }),

    CATEGORY: CustomChip({
      props: {
        ...readyProps,
        icon: <CategoryOutlinedIcon color="info" />,
      },
    }),
  };
  const ReadyChip = TypeOfRowIcons[type];

  return ReadyChip;
};
