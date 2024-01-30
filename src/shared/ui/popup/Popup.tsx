import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '@mui/icons-material/Close';

import style from './Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  headerTitle: string;
  body: string | ReactNode;
  toggleModal: () => void;
  buttons: ReactNode[];
  closeonClickSpace?: boolean;
  testid?: string;
  onCloseModal: () => void;
  styles: {
    size: string;
    substr: string;
  };
}

const DATA_SET = 'poput';

export const Popup = ({
  testid,
  isOpen,
  headerTitle = '',
  body,
  toggleModal,
  buttons = [],
  closeonClickSpace = true,
  onCloseModal,
  styles = null, // HELP => тут нужно передать нужную высоту и ширину
}: PopupProps) => {
  const handleClickOutside = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const { target } = e;
    // If event target not an HTMLButtonElement, exit
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    if (target?.dataset?.clickId && closeonClickSpace) {
      (onCloseModal ?? toggleModal)();
    }
  };

  return isOpen
    ? createPortal(
        <div
          data-testid={testid}
          data-click-id={DATA_SET}
          className={`${style.popup} `}
          onClick={handleClickOutside}>
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
