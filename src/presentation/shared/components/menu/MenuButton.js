import {useState} from "react";
import {Button as MuiButton, Divider, Menu, MenuItem} from "@mui/material";
import {userStore} from "../../../../internal/effector/user/store";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useToggle} from "../../../../internal/hooks/useToggle";
import PasswordForm from "./components/PasswordForm";
import {changePassword, logout} from "../../../../internal/effector/user/effects";
import {useNavigate} from "react-router-dom";
import Popup from "../../ui/popup/Popup";
import Button, {ButtonsType} from "../../ui/button/Button";
import {changePasswordFormSelectors} from "../../../../internal/effector/password/forms";

const ActionTypes = {
  exit: 'exit',
  profileEdit: 'profileEdit'
}

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, toggleModal] = useToggle()
  const open = !!anchorEl
  const user = userStore.userData.useValue()
  const resetForm = changePasswordFormSelectors.useResetForm()
  const isValidForm = changePasswordFormSelectors.useIsFormValid()
  const onClickSubmit = changePasswordFormSelectors.useOnClickSubmit()
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (type) => {
    switch (type) {
      case ActionTypes.profileEdit:
        toggleModal()
        break
      case ActionTypes.exit:
        logout(navigate)
        break
    }

    setAnchorEl(null)
  }

  const handleCloseModal = () => {
    toggleModal()
    resetForm()
  }

  const onSubmit = () => {
    if (!isValidForm) return

    onClickSubmit()
  }

  const handleChangePassword = (data) => {
    changePassword(data)
      .then(() => {
        handleCloseModal()
      })
      .catch(err => {
        console.log('ChangePassword error', err?.response)
      })
  }

  return (
    <div className={'menu-button'}>
      <MuiButton
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          background: '#667A8A',
          color: 'white',
          padding: '9px 18px',
          '&:hover': {
            background: '#667A8A'
          },
          justifyContent: 'flex-start',
          overflow: 'hidden',
          maxWidth: '100%',
          'span': {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }
        }}
      >
        <span>{user?.email ?? '-'}</span>
        <ArrowDropDownIcon
          sx={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: 'all .15s ease'
          }}
        />
      </MuiButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => handleClose(ActionTypes.profileEdit)}
        >
          Изменить пароль
        </MenuItem>


        <Divider />

        <MenuItem
          onClick={() => handleClose(ActionTypes.exit)}
        >
          Выйти
        </MenuItem>
      </Menu>

      <Popup
        isOpen={openModal}
        toggleModal={toggleModal}
        closeonClickSpace={false}
        headerTitle={'Изменение пароля'}
        body={<PasswordForm
          formSelectors={changePasswordFormSelectors}
          onValidSubmit={handleChangePassword}
        />}
        onCloseModal={handleCloseModal}
        buttons={[
          <Button
            key={'action_1'}
            type={ButtonsType.action}
            disabled={!isValidForm}
            onClick={onSubmit}
          >
            Сохранить
          </Button>,
          <Button
            key={'action_2'}
            type={ButtonsType.action}
            onClick={handleCloseModal}
          >
            Отменить
          </Button>,
        ]}
      />
    </div>
  )
}

export default MenuButton
