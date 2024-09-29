import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { documentMenuItems } from '../utils/menuItems';

const MenuBody: React.FC = () => {
  const menu = useRef<Menu>(null);

  return (
    <>
      <Menu model={documentMenuItems} popup ref={menu} id="popup_menu_left" />
      <Button
        icon="pi pi-ellipsis-v"
        onClick={(event) => menu?.current?.toggle(event)}
        aria-controls="popup_menu_left"
        aria-haspopup
        text
      />
    </>
  );
};

export default MenuBody;
