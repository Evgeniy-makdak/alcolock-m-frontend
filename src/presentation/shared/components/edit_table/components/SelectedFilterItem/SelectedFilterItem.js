import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import './SelectedFilterItem.sass';

const SelectedFilterItem = ({ value, id, deleteSelectItem }) => {
  return (
    <div className={'selected-filter-item'}>
      <span>{value}</span>

      <div className="selected-filter-item__delete" onClick={() => deleteSelectItem(id)}>
        <CloseRoundedIcon />
      </div>
    </div>
  );
};

export default SelectedFilterItem;
