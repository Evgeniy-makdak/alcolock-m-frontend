/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import { AppConstants } from '@app/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputsColumnWrapper } from '@shared/components/Inputs_column_wrapper';
import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import { Button, ButtonsType } from '@shared/ui/button';
import { Loader } from '@shared/ui/loader';

import { LABEL_TEXT } from '../lib/const';
import { schema } from '../lib/validation';
import style from './ActivateForm.module.scss';

interface ActivateForm {
  onValidSubmit: (duration: number) => void;
  isLoading?: boolean;
  handleClosePopup: () => void;
}

export const ActivateForm = ({ onValidSubmit, isLoading, handleClosePopup }: ActivateForm) => {
  const {
    register,
    handleSubmit,
    formState: {
      errors: { duration },
    },
    // TODO => следить за обновлением библиотеки, должны исправить в 8 версии
  } = useForm<any>({
    defaultValues: { duration: 1 },
    resolver: yupResolver(schema),
  });
  const error = duration ? duration.message.toString() : '';

  return (
    <Loader isLoading={isLoading}>
      <form onSubmit={handleSubmit((data) => onValidSubmit(data?.duration))}>
        <InputsColumnWrapper>
          <TextField
            helperText={<span className={style.errorMessage}>{error}</span>}
            error={!!duration}
            label={LABEL_TEXT}
            {...register('duration')}
            type="number"
          />
        </InputsColumnWrapper>
        <ButtonFormWrapper>
          <Button
            key={'action_1'}
            type="submit"
            disabled={!!duration}
            typeButton={ButtonsType.action}>
            {'Включить'}
          </Button>
          <Button key={'action_2'} typeButton={ButtonsType.action} onClick={handleClosePopup}>
            {AppConstants.cancelTxt}
          </Button>
        </ButtonFormWrapper>
      </form>
    </Loader>
  );
};
