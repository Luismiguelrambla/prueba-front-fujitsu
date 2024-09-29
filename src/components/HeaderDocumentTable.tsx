import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

interface DocumentTableHeaderProps {
  documentsCount: number;
  selectedDocumentsCount: number;
  expandAll: () => void;
  collapseAll: () => void;
}

const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
  documentsCount,
  selectedDocumentsCount,
  expandAll,
  collapseAll,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="p-datatable-header-text">
        <span>{`${t('documentTable.contains')} ${documentsCount} ${documentsCount === 1 ? `${t('documentTable.document')}` : `${t('documentTable.documents')}`}`}</span>
      </div>
      <div className="p-datatable-header-button">
        {selectedDocumentsCount > 0 && (
          <Button
            className="p-trash-button"
            icon="pi pi-trash"
            label={`${t('documentTable.remove')} (${selectedDocumentsCount})`}
          />
        )}
        <Button
          className="p-expand-collapse-button"
          icon="pi pi-plus"
          label={`${t('documentTable.expandAll')}`}
          onClick={expandAll}
          text
        />
        <Button
          className="p-expand-collapse-button"
          icon="pi pi-minus"
          label={`${t('documentTable.collapseAll')}`}
          onClick={collapseAll}
          text
        />
      </div>
    </>
  );
};

export default DocumentTableHeader;
