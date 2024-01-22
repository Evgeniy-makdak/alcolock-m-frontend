import { useEffect } from 'react';

export const Form = ({ children, formSelectors, onValidSubmit, className = '' }) => {
  const setOnValidSubmit = formSelectors.useSetOnValidSubmit();

  useEffect(() => {
    setOnValidSubmit(onValidSubmit);
  }, [onValidSubmit]);

  return (
    <div className={`${className}`}>
      <form
        onKeyDown={(e) => {
          if (e.code === 'Enter') e.preventDefault();
        }}>
        {children}
      </form>
    </div>
  );
};
