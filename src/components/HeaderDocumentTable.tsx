import React from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

interface DocumentTableHeaderProps {
  documentsCount: number;
  selectedDocumentsCount: number;
  expandAll: () => void;
  collapseAll: () => void;
  onDelete: () => Promise<void>;
}

const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({
  documentsCount,
  selectedDocumentsCount,
  expandAll,
  collapseAll,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="p-datatable-header-text">
        <span aria-live="polite">
          {`${t('documentTable.contains')} ${documentsCount} ${documentsCount === 1 ? `${t('documentTable.document')}` : `${t('documentTable.documents')}`}`}
        </span>
      </div>
      <div
        className="p-datatable-header-button"
        role="group"
        aria-label="actions group"
      >
        {selectedDocumentsCount > 0 && (
          <Button
            className="p-trash-button"
            icon="pi pi-trash"
            label={`${t('documentTable.remove')} (${selectedDocumentsCount})`}
            onClick={onDelete}
            aria-label="delete selected"
          />
        )}
        <Button
          className="p-expand-collapse-button"
          icon="pi pi-plus"
          label={`${t('documentTable.expandAll')}`}
          onClick={expandAll}
          text
          aria-label="expand all"
        />
        <Button
          className="p-expand-collapse-button"
          icon="pi pi-minus"
          label={`${t('documentTable.collapseAll')}`}
          onClick={collapseAll}
          text
          aria-label="collapse all"
        />
      </div>
    </>
  );
};

export default DocumentTableHeader;
