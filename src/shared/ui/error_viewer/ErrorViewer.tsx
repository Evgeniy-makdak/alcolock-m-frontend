import { ReactNode } from 'react';

import style from './ErrorViewer.module.scss';

interface ErrorViewerProps {
  errorMessages: (ReactNode | string | number)[];
  testid?: string;
}

export const ErrorViewer = ({ errorMessages, testid }: ErrorViewerProps) => {
  return (
    <div data-testid={testid} className={style.errorViewer}>
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
