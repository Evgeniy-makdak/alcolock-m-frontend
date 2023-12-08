import {Button as MuiButton} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import './FilterButton.sass'

const FilterButton = (
  {
    open,
    toggle,
    active
  }) => {
  return (
    <div
      className={`filter-button ${active ? 'active' : ''}`}
    >
      <MuiButton onClick={toggle}>
        <span>Фильтр</span>

        <ArrowDropDownIcon
          sx={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            transition: 'all .15s ease'
          }}
        />
      </MuiButton>
    </div>
  )
}

export default FilterButton
