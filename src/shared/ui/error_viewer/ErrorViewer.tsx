import { ReactNode } from 'react';

import style from './ErrorViewer.module.scss';

interface ErrorViewerProps {
  errorMessages: (ReactNode | string | number)[];
}

export const ErrorViewer = ({ errorMessages }: ErrorViewerProps) => {
  return (
    <div className={style.errorViewer}>
      {errorMessages.map((error, i) => {
        return (
          <span className={style.text} key={i}>
            {error}
          </span>
        );
      })}
    </div>
  );
};
