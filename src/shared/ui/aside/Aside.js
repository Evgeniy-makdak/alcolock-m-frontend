import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import style from './Aside.module.scss';

export const Aside = ({ children, onClose }) => {
  return (
    <div className={style.aside}>
      {children}

      <div className={style.close} onClick={onClose}>
        <ArrowBackIosNewIcon />
      </div>
    </div>
  );
};
