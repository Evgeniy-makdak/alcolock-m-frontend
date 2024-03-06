import type { FC, ReactNode } from 'react';

import type { ID } from 'effector';

import { Typography } from '@mui/material';

import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';
import { testids } from '@shared/const/testid';
import { Button } from '@shared/ui/button';

import { useDeleteCarForm } from '../hooks/useDeleteCarForm';

type DeleteCarFormProps = {
  car: { id: ID; text: ReactNode };
  closeModal: () => void;
};

export const DeleteCarForm: FC<DeleteCarFormProps> = ({ car, closeModal }) => {
  const handleDelete = useDeleteCarForm(car.id, closeModal);
  return (
    <div>
      <Typography marginBottom={3} fontWeight={700} variant="h6">
        Удаление ТС
      </Typography>
      <Typography>Вы действительно хотите удалить транспортное средство {car.text}</Typography>
      <ButtonFormWrapper>
        <Button testid={`${testids.POPUP_ACTION_BUTTON}`} onClick={handleDelete}>
          удалить
        </Button>
        <Button testid={`${testids.POPUP_CANCEL_BUTTON}`} onClick={closeModal}>
          отмена
        </Button>
      </ButtonFormWrapper>
    </div>
  );
};
