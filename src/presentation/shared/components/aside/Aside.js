import './Aside.sass'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Aside = ({children, onClose}) => {
  return (
    <div className={'aside'}>
      {children}

      <div
        className="aside__close"
        onClick={onClose}
      >
        <ArrowBackIosNewIcon />
      </div>
    </div>
  )
}

export default Aside
