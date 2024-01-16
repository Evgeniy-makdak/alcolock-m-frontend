import { Button as MuiButton } from '@mui/material';

import './Button.sass';

export const ButtonsType = {
  edit: 'edit',
  new: 'new',
  delete: 'delete',
  action: 'action',
};

const Button = ({ children, onClick, type = ButtonsType.new, disabled = false }) => {
  return (
    <MuiButton className={`button ${type}`} onClick={onClick} disabled={disabled}>
      {children}
    </MuiButton>
  );
};

export default Button;
