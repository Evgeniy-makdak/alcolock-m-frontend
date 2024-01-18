import style from './ErrorViewer.module.scss';

const ErrorViewer = ({ errorMessages }) => {
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

export default ErrorViewer;
