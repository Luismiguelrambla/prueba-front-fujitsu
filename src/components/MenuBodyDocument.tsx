import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';

const MenuBody: React.FC = () => {
  const { t } = useTranslation();
  const menu = useRef<Menu>(null);

  const documentMenuItems: MenuItem[] = [
    { label: `${t('documentTable.i3IDMenu')}`, icon: 'pi pi-book' },
    { label: `${t('documentTable.favMenu')}`, icon: 'pi pi-star-fill' },
    { label: `${t('documentTable.fileMenu')}`, icon: 'pi pi-search' },
    { separator: true },
    { label: `${t('documentTable.helpMenu')}`, icon: 'pi pi-info-circle' },
  ];

  return (
    <>
      <Menu
        model={documentMenuItems}
        popup
        ref={menu}
        id="popup_menu_left"
        aria-labelledby="menu_button"
      />
      <Button
        icon="pi pi-ellipsis-v"
        aria-controls="popup_menu_left"
        aria-haspopup="true"
        aria-expanded="false"
        id="menu_button"
        aria-label="documentTable.menuButton"
        text
      />
    </>
  );
};

export default MenuBody;
