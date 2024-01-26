import MenuButton from '@shared/ui/menu/MenuButton';

import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <MenuButton />
    </header>
  );
};
