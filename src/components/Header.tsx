import { useState } from 'react';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { ILanguageOption } from '../types/interfaces';
import './Header.css';

const languageOptions: ILanguageOption[] = [
  { name: '🇪🇸 Español', code: 'ES' },
  { name: '🇬🇧 English', code: 'EN' },
];

const Header = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<ILanguageOption | null>(null);

  const handleSwitchChange = (e: InputSwitchChangeEvent) => {
    setChecked(e.value);
  };

  const handleLanguageChange = (e: { value: ILanguageOption }) => {
    setSelectedLanguage(e.value);
  };

  return (
    <div className="header">
      <div className="header-title">
        <span>Prueba front-end developer</span>
      </div>

      <div className="header-options">
        <div className="option-enable-viewing">
          <span>Habilitar permisos de visualización</span>
          <InputSwitch checked={checked} onChange={handleSwitchChange} />
        </div>

        <div className="option-language">
          <Dropdown
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            optionLabel="name"
            placeholder="Select language"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
