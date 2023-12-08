import {createPortal} from "react-dom";
import './Popup.sass'
import CloseIcon from '@mui/icons-material/Close';
const Popup = (
  {
    isOpen,
    headerTitle = '',
    body,
    toggleModal,
    buttons = [],
    closeonClickSpace = true,
    onCloseModal,
    size = ''
  }) => {
  const handleClickOutside = (e) => {
    const {target} = e

    if (target && !target.closest('.popup__substr') && closeonClickSpace) {
      (onCloseModal ?? toggleModal)()
    }
  }

  return isOpen
    ? (
      createPortal(
        <div className={`popup ${size ? `popup_${size}` : ''}`} onClick={handleClickOutside}>
          <div className="popup__substr">
            <div className="popup__close" onClick={onCloseModal ?? toggleModal}>
              <CloseIcon/>
            </div>

            <div className="popup__header">
              <h4>
                {headerTitle}
              </h4>
            </div>

            <div className="popup__body">
              {body}
            </div>

            <div className="popup__buttons">
              {buttons}
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )
    )
    : null
}

export default Popup
