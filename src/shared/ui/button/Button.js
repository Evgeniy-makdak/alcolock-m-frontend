import { Button as MuiButton } from '@mui/material';

import style from './Button.module.scss';

export const ButtonsType = {
  edit: 'edit',
  new: 'new',
  delete: 'delete',
  action: 'action',
};

const ButtonsTypeStyle = {
  [ButtonsType.edit]: style.edit,
  [ButtonsType.new]: style.new,
  [ButtonsType.delete]: style.delete,
  [ButtonsType.action]: style.action,
};

export const Button = ({ children, onClick, type = ButtonsType.new, disabled = false }) => {
  return (
    <MuiButton className={`button ${ButtonsTypeStyle[type]}`} onClick={onClick} disabled={disabled}>
      {children}
    </MuiButton>
  );
};
