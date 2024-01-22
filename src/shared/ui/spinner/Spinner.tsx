import { CircularProgress } from '@mui/material';

import style from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={style.wrapper}>
      <CircularProgress />
    </div>
  );
};
