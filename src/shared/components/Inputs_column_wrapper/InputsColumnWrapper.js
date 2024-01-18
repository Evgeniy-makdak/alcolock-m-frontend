import style from './InputsColumnWrapper.module.scss';

export const InputsColumnWrapper = ({ children }) => {
  return <div className={style.inputsWrapper}>{children}</div>;
};
