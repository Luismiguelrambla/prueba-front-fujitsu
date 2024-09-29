import React from 'react';
import { Button } from 'primereact/button';

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
}) => (
  <>
    <div className="p-datatable-header-text">
      <span>{`Contiene ${documentsCount} ${documentsCount === 1 ? 'documento' : 'documentos'}`}</span>
    </div>
    <div className="p-datatable-header-button">
      {selectedDocumentsCount > 0 && (
        <Button
          className="p-trash-button"
          icon="pi pi-trash"
          label={`Eliminar (${selectedDocumentsCount})`}
        />
      )}
      <Button
        className="p-expand-collapse-button"
        icon="pi pi-plus"
        label="Expand All"
        onClick={expandAll}
        text
      />
      <Button
        className="p-expand-collapse-button"
        icon="pi pi-minus"
        label="Collapse All"
        onClick={collapseAll}
        text
      />
    </div>
  </>
);

export default DocumentTableHeader;
