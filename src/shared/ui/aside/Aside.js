import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import './Aside.sass';

const Aside = ({ children, onClose }) => {
  return (
    <div className={'aside'}>
      {children}

      <div className="aside__close" onClick={onClose}>
        <ArrowBackIosNewIcon />
      </div>
    </div>
  );
};

export default Aside;
