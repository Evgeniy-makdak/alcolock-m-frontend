import MenuButton from '@presentation/shared/ui/menu/MenuButton';

import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <MenuButton />
    </header>
  );
};

export default Header;
