/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC } from 'react';

import { TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { CarColorSelect } from '@entities/car_color_select';
import { TransportTypeSelect } from '@entities/transport_type_select';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper';
import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import { MuiLocalizationProvider } from '@shared/components/mui_localization_provider';
import { testids } from '@shared/const/testid';
import type { ID } from '@shared/types/BaseQueryTypes';
import { Button } from '@shared/ui/button';
import { Loader } from '@shared/ui/loader';

import { useCarAddChangeForm } from '../hooks/useCarAddChangeForm';
import style from './CarAddChangeForm.module.scss';

type CarAddChangeFormProps = {
  closeModal: () => void;
  id?: ID;
};

export const CarAddChangeForm: FC<CarAddChangeFormProps> = ({ closeModal, id }) => {
  const {
    errorMark,
    errorModel,
    errorVin,
    errorRegistrationNumber,
    errorYear,
    errorType,
    errorColor,
    selectType,
    selectColor,
    handleSubmit,
    onSetDate,
    yearValue,
    onSelect,
    register,
    isLoadingCar,
  } = useCarAddChangeForm(id, closeModal);

  return (
    <Loader isLoading={isLoadingCar}>
      <form className={style.inputsWrapper} onSubmit={handleSubmit}>
        <Typography fontWeight={600} marginBottom={2} variant="h6">
          {id ? 'Редактирование ТС' : 'Добавление ТС'}
        </Typography>
        {isLoadingCar ? null : (
          <>
            <InputsColumnWrapper>
              <TextField
                helperText={<span>{errorMark}</span>}
                error={!!errorMark}
                {...register('mark')}
                label={'Марка'}
              />
              <TextField
                helperText={<span>{errorModel}</span>}
                error={!!errorModel}
                {...register('model')}
                label={'Модель'}
              />
              <TransportTypeSelect
                name={'type'}
                testid={
                  testids.page_transports.transports_widget_table
                    .TRANSPORT_WIDGET_TABLE_ADD_OR_CHANGE_MODAL
                }
                value={selectType}
                setValueStore={onSelect}
                error={!!errorType}
                label={'Тип'}
                helperText={errorType}
              />
              <TextField
                helperText={<span>{errorVin}</span>}
                error={!!errorVin}
                {...register('vin')}
                label={'VIN'}
              />
              <CarColorSelect
                name={'color'}
                testid={
                  testids.page_transports.transports_widget_table
                    .TRANSPORT_WIDGET_TABLE_ADD_OR_CHANGE_MODAL
                }
                value={selectColor}
                setValueStore={onSelect}
                error={!!errorColor}
                label={'Цвет'}
                helperText={errorColor}
              />
              <TextField
                helperText={<span>{errorRegistrationNumber}</span>}
                error={!!errorRegistrationNumber}
                {...register('registrationNumber')}
                label={'Государственный номер'}
              />
              <MuiLocalizationProvider>
                <DatePicker
                  disableFuture
                  value={yearValue}
                  {...register('year')}
                  slotProps={{
                    textField: {
                      error: !!errorYear,
                      helperText: errorYear,
                    },
                  }}
                  label={'Год выпуска'}
                  onChange={onSetDate}
                  views={['year']}
                />
              </MuiLocalizationProvider>
            </InputsColumnWrapper>
            <ButtonFormWrapper>
              <Button type="submit">{id ? 'сохранить' : 'добавить'}</Button>
              <Button onClick={closeModal}>отмена</Button>
            </ButtonFormWrapper>
          </>
        )}
      </form>
    </Loader>
  );
};
