import { useEffect, useState } from 'react';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { ILanguageOption } from '../types/interfaces';
import { useTranslation } from 'react-i18next';
import './Header.css';

const languageOptions: ILanguageOption[] = [
  { name: '🇪🇸 Español', code: 'es' },
  { name: '🇬🇧 English', code: 'en' },
];

interface HeaderProps {
  onSwitchChange: (isChecked: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onSwitchChange }) => {
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] =
    useState<ILanguageOption | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(JSON.parse(savedLanguage));
    } else {
      const defaultLanguage = window.navigator.language.includes('en')
        ? languageOptions[1]
        : languageOptions[0];
      setSelectedLanguage(defaultLanguage);
      localStorage.setItem('selectedLanguage', JSON.stringify(defaultLanguage));
    }
  }, []);

  const handleSwitchChange = (e: InputSwitchChangeEvent) => {
    setChecked(e.value);
    onSwitchChange(e.value);
  };

  const handleLanguageChange = (e: { value: ILanguageOption }) => {
    setSelectedLanguage(e.value);
    i18n.changeLanguage(e.value.code);
    localStorage.setItem('selectedLanguage', JSON.stringify(e.value));
  };

  return (
    <div className="header" role="banner">
      <div className="header-title" aria-label="header title">
        <span>{t('header.title')}</span>
      </div>

      <div className="header-options" role="group" aria-label="header options">
        <div className="option-enable-viewing">
          <span>{t('header.enableViewingPermissions')}</span>
          <InputSwitch
            checked={checked}
            onChange={handleSwitchChange}
            aria-label="toggle viewing permissions"
          />
        </div>

        <div className="option-language">
          <Dropdown
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            optionLabel="name"
            placeholder={t('header.selectLanguage')}
            aria-label="select language"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
