import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button as MuiButton } from '@mui/material';

import styles from './FilterButton.module.scss';

const FilterButton = ({ open, toggle, active }) => {
  return (
    <div>
      <MuiButton
        onClick={toggle}
        className={`${styles.filterButton} ${active ? styles.active : styles.close}`}>
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

export default FilterButton;
