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
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState<ILanguageOption | null>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(JSON.parse(savedLanguage));
    } else {
      if (window.navigator.language.includes('en')) {
        setSelectedLanguage(languageOptions[1]);
        localStorage.setItem(
          'selectedLanguage',
          JSON.stringify(selectedLanguage)
        );
      } else {
        setSelectedLanguage(languageOptions[0]);
        localStorage.setItem(
          'selectedLanguage',
          JSON.stringify(selectedLanguage)
        );
      }
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
    <div className="header">
      <div className="header-title">
        <span>{t('header.title')}</span>
      </div>

      <div className="header-options">
        <div className="option-enable-viewing">
          <span>{t('header.enableViewingPermissions')}</span>
          <InputSwitch checked={checked} onChange={handleSwitchChange} />
        </div>

        <div className="option-language">
          <Dropdown
            value={selectedLanguage}
            onChange={handleLanguageChange}
            options={languageOptions}
            optionLabel="name"
            placeholder={t('header.selectLanguage')}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
