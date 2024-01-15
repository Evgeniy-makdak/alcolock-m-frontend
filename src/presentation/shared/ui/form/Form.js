import { useEffect } from 'react';

const Form = ({ children, formSelectors, onValidSubmit, className = '' }) => {
  const setOnValidSubmit = formSelectors.useSetOnValidSubmit();

  useEffect(() => {
    setOnValidSubmit(onValidSubmit);
  }, [onValidSubmit]);

  return (
    <div className={`form ${className}`}>
      <form
        onKeyDown={(e) => {
          if (e.code === 'Enter') e.preventDefault();
        }}>
        {children}
      </form>
    </div>
  );
};

export default Form;
