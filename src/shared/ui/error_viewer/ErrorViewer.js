import './ErrorViewer.sass';

const ErrorViewer = ({ errorMessages }) => {
  return (
    <div className={'error-viewer'}>
      {errorMessages.map((error, i) => {
        return <span key={i}>{error}</span>;
      })}
    </div>
  );
};

export default ErrorViewer;
