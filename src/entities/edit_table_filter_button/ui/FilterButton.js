import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button as MuiButton } from '@mui/material';

import style from './FilterButton.module.scss';

export const FilterButton = ({ open, toggle, active }) => {
  return (
    <div>
      <MuiButton
        onClick={toggle}
        className={`${style.filterButton} ${active ? style.active : style.close}`}>
        <span>Фильтр</span>

        <ArrowDropDownIcon
          sx={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: 'all .15s ease',
          }}
        />
      </MuiButton>
    </div>
  );
};
