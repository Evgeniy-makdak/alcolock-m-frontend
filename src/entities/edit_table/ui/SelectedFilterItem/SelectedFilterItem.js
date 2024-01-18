import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import style from './SelectedFilterItem.module.scss';

const SelectedFilterItem = ({ value, id, deleteSelectItem }) => {
  return (
    <div className={style.selectedFilterItem}>
      <span>{value}</span>

      <div className={style.selectedFilterItem_delete} onClick={() => deleteSelectItem(id)}>
        <CloseRoundedIcon />
      </div>
    </div>
  );
};

export default SelectedFilterItem;
