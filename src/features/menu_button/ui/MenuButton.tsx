import { type FC, useState } from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Divider, Menu, MenuItem, Button as MuiButton } from '@mui/material';

import { testids } from '@shared/const/testid';
import { appStore } from '@shared/model/app_store/AppStore';

type MenuButtonProps = {
  toggleModal: () => void;
  close: () => void;
};

export const MenuButton: FC<MenuButtonProps> = ({ close, toggleModal }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { email, logout } = appStore((state) => state);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    close();
    setAnchorEl(null);
  };
  return (
    <div>
      <MuiButton
        onClick={handleClick}
        data-testid={testids.widget_navbar.NAVBAR_POPUP_BUTTON}
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        sx={{
          background: '#667A8A',
          color: 'white',
          padding: '9px 18px',
          '&:hover': {
            background: '#667A8A',
          },
          justifyContent: 'flex-start',
          overflow: 'hidden',
          maxWidth: '100%',
          span: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          },
        }}>
        <span>{email || '-'}</span>
        <ArrowDropDownIcon
          sx={{
            transform: `rotate(${anchorEl ? 180 : 0}deg)`,
            transition: 'all .15s ease',
          }}
        />
      </MuiButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          data-testid={testids.widget_navbar.NAVBAR_POPUP_CHANGE_PASSWORD_BUTTON}
          onClick={toggleModal}>
          Изменить пароль
        </MenuItem>

        <Divider />

        <MenuItem
          data-testid={testids.widget_navbar.NAVBAR_POPUP_CHANGE_EXIT_BUTTON}
          onClick={logout}>
          Выйти
        </MenuItem>
      </Menu>
    </div>
  );
};
