import { BranchSelect } from '@entities/branch_select';
import { testids } from '@shared/const/testid';

import { useNavbarBranchSelect } from '../hooks/useNavbarBranchSelect';
import style from './BranchSelect.module.scss';

export const NavbarBranchSelect = () => {
  const { isAdmin, onChangeBranch, value } = useNavbarBranchSelect();
  return (
    <div className={style.branchSelect}>
      <BranchSelect
        value={value}
        disabled={!isAdmin}
        setValueStore={onChangeBranch}
        label="Выбранный филиал"
        name={'navbarBranchSelect'}
        testid={testids.widget_navbar.NAVBAR_INPUT_CHOOSE_FILIAL_OPEN_LIST_ITEM}
      />
    </div>
  );
};
