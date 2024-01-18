import { cloneElement } from 'react';

import style from './ValidationsWrapper.module.scss';

const ValidationsWrapper = ({ children, validationMsgs = [], isShowValidMsg = true }) => {
  const styledChildren = () => {
    if (Array.isArray(children)) {
      return children.map((child, i) => {
        return cloneElement(child, {
          key: i,
          className: `${child.props.classNaWWme ?? ''}${validationMsgs.length ? style.errorInput : ''}`,
        });
      });
    } else {
      return cloneElement(children, {
        className: `${children.props.className ?? ''}${validationMsgs.length ? style.errorInput : ''}`,
      });
    }
  };

  return (
    <>
      {styledChildren()}

      {isShowValidMsg && (
        <div>
          {validationMsgs.map((msg, i) => {
            return (
              <span key={i} className={style.validationMessages}>
                {msg}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ValidationsWrapper;
