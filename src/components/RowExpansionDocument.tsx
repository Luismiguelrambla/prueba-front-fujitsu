import React from 'react';
import { useTranslation } from 'react-i18next';
import { IDocument } from '../types/interfaces';

interface RowExpansionProps {
  document: IDocument;
}

const RowExpansion: React.FC<RowExpansionProps> = ({ document }) => {
  const { t } = useTranslation();

  return (
    <div className="expansion-row">
      <img src="src/assets/pdf-file-icon.svg" alt="PDF Icon" />
      <div className="expansion-container">
        <div>
          <p className="title">{document.name}</p>
          <p className="subtitle">{document.description}</p>
        </div>
        <div>
          <p className="title">
            {t('documentTable.rowExpansion.sourceEvaluation')}
          </p>
          <p className="subtitle">{document.sourceEvaluation}</p>
        </div>
      </div>
      <div className="expansion-container">
        <div>
          <p className="title">
            {t('documentTable.rowExpansion.templateUsed')}
          </p>
          <p className="subtitle">{document.template}</p>
        </div>
        <div>
          <p className="title">{t('documentTable.rowExpansion.dateCreated')}</p>
          <p className="subtitle">{document.date} h</p>
        </div>
      </div>
      <div className="expansion-container">
        <div>
          <p className="title">
            {t('documentTable.rowExpansion.documentRestrictions')}
          </p>
          <p className="subtitle">
            {document.constraints.length} Restricciones
          </p>
        </div>

        <div>
          <p className="title">{t('documentTable.rowExpansion.tags')}</p>
          <p className="subtitle">
            {document.tags.bag + document.tags.box} Etiquetas
          </p>
        </div>
      </div>
    </div>
  );
};

export default RowExpansion;
