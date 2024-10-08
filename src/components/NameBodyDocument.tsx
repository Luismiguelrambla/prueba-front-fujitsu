import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import arrowsIcon from '../assets/arrows.svg';

interface NameBodyProps {
  name: string;
}

const NameBody: React.FC<NameBodyProps> = ({ name }) => {
  const { t } = useTranslation();
  const [isSmallerWidth, setIsSmallerWidth] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallerWidth(window.innerWidth < 1650);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="p-column-nameBody"
      role="group"
      aria-labelledby="document-name"
    >
      <span id="document-name">{name}</span>
      <div className="p-column-nameBody-sub">
        <div>
          <p>{t('documentTable.documentType')}</p>
          <img src={arrowsIcon} alt="arrows" aria-hidden="true" />
        </div>
        {!isSmallerWidth && (
          <p
            className="p-column-nameBody-breadcrumbs"
            title={
              'Expedientes > Contenido Islas Baleares > Expedientes Material'
            }
            aria-label="breadcrumbs"
          >
            {'Expedientes > Contenido Islas Baleares > Expedientes Material'}
          </p>
        )}
      </div>
    </div>
  );
};

export default NameBody;
