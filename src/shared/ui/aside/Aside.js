import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import style from './Aside.module.scss';

const Aside = ({ children, onClose }) => {
  return (
    <div className={style.aside}>
      {children}

      <div className={style.close} onClick={onClose}>
        <ArrowBackIosNewIcon />
      </div>
    </div>
  );
};

export default Aside;
