import { ReactNode } from 'react';

import { Button as MuiButton } from '@mui/material';

import style from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type: ButtonsType;
  disabled: boolean;
}

export enum ButtonsType {
  edit = 'edit',
  new = 'new',
  delete = 'delete',
  action = 'action',
}

const ButtonsTypeStyle = {
  [ButtonsType.edit]: style.edit,
  [ButtonsType.new]: style.newStyle,
  [ButtonsType.delete]: style.deleteStyle,
  [ButtonsType.action]: style.action,
};

export const Button = ({
  children,
  onClick,
  type = ButtonsType.new,
  disabled = false,
}: ButtonProps) => {
  return (
    <MuiButton className={`button ${ButtonsTypeStyle[type]}`} onClick={onClick} disabled={disabled}>
      {children}
    </MuiButton>
  );
};
