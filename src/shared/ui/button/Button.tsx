import { ReactNode } from 'react';

import { type ButtonProps, Button as MuiButton } from '@mui/material';

import style from './Button.module.scss';

interface MyButtonProps extends ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  typeButton?: ButtonsType;
  disabled?: boolean;
  testid?: string;
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
  typeButton = ButtonsType.action,
  disabled = false,
  testid,
  ...rest
}: MyButtonProps) => {
  return (
    <MuiButton
      {...rest}
      data-testid={testid}
      className={`button ${ButtonsTypeStyle[typeButton]}`}
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
      disabled={disabled}>
      {children}
    </MuiButton>
  );
};
