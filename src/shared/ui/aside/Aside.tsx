import { ReactNode } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import style from './Aside.module.scss';

interface AsideProps {
  children: ReactNode;
  onClose: () => void;
}

export const Aside = ({ children, onClose }: AsideProps) => {
  return (
    <div className={style.aside}>
      {children}

      <div className={style.close} onClick={onClose}>
        <ArrowBackIosNewIcon />
      </div>
    </div>
  );
};
