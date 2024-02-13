import { useEffect, useState } from 'react';

import { debounce } from 'lodash';

import ReplayIcon from '@mui/icons-material/Replay';
import type { SvgIconProps } from '@mui/material';

import style from './Refetch.module.scss';

export const Refetch = ({
  onClick,
  rest,
  styles,
}: {
  onClick?: () => void;
  rest?: SvgIconProps;
  styles?: string;
}) => {
  const [animate, setAnimate] = useState(null);

  const onClickAnimate = () => {
    setAnimate(style.click);
    onClick();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(null);
    }, 500);
    return () => clearTimeout(timeout);
  }, [animate]);
  const debounced = debounce(onClickAnimate, 500);
  return (
    <>
      <button className={`${style.button} ${styles}`} onClick={debounced}>
        <ReplayIcon className={animate} {...rest} />
      </button>
    </>
  );
};
