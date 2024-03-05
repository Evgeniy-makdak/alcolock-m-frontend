import type { FC, ReactNode } from 'react';

import { Alert, type AlertProps, AlertTitle, Collapse, Typography } from '@mui/material';

import { ButtonFormWrapper } from '@shared/components/button_form_wrapper/ButtonFormWrapper';

import { Button } from '../button';

type AppAlertProps = {
  title: string;
  text: string | ReactNode;
  onSubmit: () => void;
  onClose: () => void;
  open: boolean;
} & AlertProps;

export const AppAlert: FC<AppAlertProps> = ({ onClose, onSubmit, text, title, open, ...rest }) => {
  return (
    <Collapse in={open}>
      <Alert {...rest}>
        <AlertTitle>
          <Typography fontSize={16} fontWeight={600}>
            {title}
          </Typography>
        </AlertTitle>
        {text}
        <ButtonFormWrapper>
          <Button onClick={onSubmit}>подтвердить</Button>
          <Button onClick={onClose}>отмена</Button>
        </ButtonFormWrapper>
      </Alert>
    </Collapse>
  );
};
