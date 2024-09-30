import React from 'react';
import { useTranslation } from 'react-i18next';
import { IDocument } from '../types/interfaces';
import pdfFileIcon from '../assets/pdf-file-icon.svg';

interface RowExpansionProps {
  document: IDocument;
}

const RowExpansion: React.FC<RowExpansionProps> = ({ document }) => {
  const { t } = useTranslation();

  return (
    <div
      className="expansion-row"
      role="group"
      aria-labelledby={`document-${document.id}-expansion`}
    >
      <img src={pdfFileIcon} alt="pdf icon" />
      <div className="expansion-container">
        <div>
          <p className="title" id={`document-${document.id}-name`}>
            {document.name}
          </p>
          <p
            className="subtitle"
            aria-labelledby={`document-${document.id}-name`}
          >
            {document.description}
          </p>
        </div>
        <div>
          <p className="title" id={`document-${document.id}-source-evaluation`}>
            {t('documentTable.rowExpansion.sourceEvaluation')}
          </p>
          <p
            className="subtitle"
            aria-labelledby={`document-${document.id}-source-evaluation`}
          >
            {document.sourceEvaluation}
          </p>
        </div>
      </div>
      <div className="expansion-container">
        <div>
          <p className="title" id={`document-${document.id}-template`}>
            {t('documentTable.rowExpansion.templateUsed')}
          </p>
          <p
            className="subtitle"
            aria-labelledby={`document-${document.id}-template`}
          >
            {document.template}
          </p>
        </div>
        <div>
          <p className="title" id={`document-${document.id}-date-created`}>
            {t('documentTable.rowExpansion.dateCreated')}
          </p>
          <p
            className="subtitle"
            aria-labelledby={`document-${document.id}-date-created`}
          >
            {document.date} h
          </p>
        </div>
      </div>
      <div className="expansion-container">
        <div>
          <p className="title" id={`document-${document.id}-restrictions`}>
            {t('documentTable.rowExpansion.documentRestrictions')}
          </p>
          <p
            className="subtitle"
            aria-labelledby={`document-${document.id}-restrictions`}
          >
            {document.constraints.length}{' '}
            {t('documentTable.rowExpansion.restrictions')}
          </p>
        </div>

        <div>
          <p className="title" id={`document-${document.id}-tags`}>
            {t('documentTable.rowExpansion.tags')}
          </p>
          <p
            className="subtitle"
            aria-labelledby={`document-${document.id}-tags`}
          >
            {document.tags.bag + document.tags.box}{' '}
            {t('documentTable.rowExpansion.tags')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RowExpansion;
