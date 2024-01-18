import CloseIcon from '@mui/icons-material/Close';
import { createPortal } from 'react-dom';

import style from './Popup.module.scss';

const DATA_SET = 'poput';

const Popup = ({
  isOpen,
  headerTitle = '',
  body,
  toggleModal,
  buttons = [],
  closeonClickSpace = true,
  onCloseModal,
  styles = null, // HELP => тут нужно передать нужную высоту и ширину
}) => {
  const handleClickOutside = (e) => {
    const { target } = e;

    if (target && target.dataset?.clickId && closeonClickSpace) {
      (onCloseModal ?? toggleModal)();
    }
  };

  return isOpen
    ? createPortal(
        <div data-click-id={DATA_SET} className={`${style.popup} `} onClick={handleClickOutside}>
          <div className={`${styles ? styles : style.size} ${style.substr}`}>
            <div className={style.close} onClick={onCloseModal ?? toggleModal}>
              <CloseIcon />
            </div>

            <div className={style.header}>
              <h4 className={style.title}>{headerTitle}</h4>
            </div>

            <div className={style.body}>{body}</div>

            <div className={style.buttons}>{buttons}</div>
          </div>
        </div>,
        document.getElementById('root'),
      )
    : null;
};

export default Popup;
