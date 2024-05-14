import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '@mui/icons-material/Close';

import { testids } from '@shared/const/testid';

import style from './Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  headerTitle?: string;
  body?: string | ReactNode;
  toggleModal: () => void;
  buttons?: ReactNode[];
  closeonClickSpace?: boolean;
  testid?: string;
  onCloseModal?: () => void;
  styles?: {
    size: string;
    substr: string;
  };
}

const DATA_SET = 'popup';

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
    console.log('Toggle is active:', headerTitle);
    const { target } = e;
    if (!('dataset' in target)) return;
    if (typeof target.dataset !== 'object') return;
    if (!('clickId' in target.dataset)) return;
    if (target?.dataset?.clickId && closeonClickSpace) {
      (onCloseModal ?? toggleModal)();
    }
  };

  useEffect(() => {
    if (isOpen) {
      console.log('header_title', headerTitle);     
    }
  }, [isOpen, headerTitle])

  return isOpen
    ? createPortal(
        <div
          data-testid={`${testids.POPUP}_${testid}`}
          data-click-id={DATA_SET}
          className={`${style.popup} `}
          onClick={handleClickOutside}>
          <div className={`${styles ? styles : style.size} ${style.substr}`}>
            <button
              data-testid={`${testids.POPUP_CLOSE_BUTTON}_${testid}`}
              className={style.close}
              onClick={onCloseModal ?? toggleModal}>
              <CloseIcon />
            </button>

            <div className={style.header}>
              <h4 className={style.title}>{headerTitle}</h4>
            </div>

            <div className={style.body}>{body}</div>

            {buttons && <div className={style.buttons}>{buttons}</div>}
          </div>
        </div>,
        document.getElementById('root'),
      )
    : null;
};
