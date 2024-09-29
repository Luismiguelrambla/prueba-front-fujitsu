import React, { useState } from 'react';
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import DocumentTableHeader from './HeaderDocumentTable';
import RowExpansion from './RowExpansionDocument';
import NameBody from './NameBodyDocument';
import TagBody from './TagBodyDocument';
import MenuBody from './MenuBodyDocument';
import { useTranslation } from 'react-i18next';
import { IDocument } from '../types/interfaces';
import './DocumentTable.css';

interface DocumentTableProps {
  documents: IDocument[];
  loading: boolean;
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  loading,
}) => {
  const { t } = useTranslation();
  const [selectedDocuments, setSelectedDocuments] = useState<
    IDocument[] | null
  >(null);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const expandAll = () => {
    const _expandedRows: DataTableExpandedRows = {};
    documents.forEach((doc) => (_expandedRows[doc.id] = true));
    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => setExpandedRows(undefined);

  return (
    <DataTable
      value={documents}
      expandedRows={expandedRows}
      onRowToggle={(e) => setExpandedRows(e.data)}
      rowExpansionTemplate={() => <RowExpansion />}
      header={
        <DocumentTableHeader
          documentsCount={documents.length}
          selectedDocumentsCount={selectedDocuments?.length ?? 0}
          expandAll={expandAll}
          collapseAll={collapseAll}
        />
      }
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      removableSort
      selectionMode={'multiple'}
      showSelectAll={false}
      selection={selectedDocuments!}
      onSelectionChange={(e) => setSelectedDocuments(e.value)}
      dataKey="id"
      loading={loading}
      scrollable
      scrollHeight="80vh"
    >
      <Column selectionMode="multiple" style={{ width: '40px' }} />
      <Column expander style={{ width: '40px' }} />
      <Column
        body={() => <img src="src/assets/pdf-icon.svg" alt="Icon" />}
        style={{ width: '40px' }}
      />
      <Column
        field="name"
        header={t('documentTable.nameHeader')}
        body={(data) => <NameBody name={data.name} />}
        sortable
      />
      <Column
        field="tags"
        header={t('documentTable.tagsHeader')}
        body={(data) => <TagBody tags={data.tags} />}
        sortable
      />
      <Column
        field="status"
        header={t('documentTable.statusHeader')}
        body={(data) => (
          <span className="p-column-statusBody">{data.status}</span>
        )}
        sortable
      />
      <Column
        field="date"
        header={t('documentTable.dateHeader')}
        body={(data) => <span className="p-column-dateBody">{data.date}</span>}
        sortable
      />
      <Column
        field="id"
        header="ID"
        body={(data) => <span className="p-column-idBody">{data.id}</span>}
        sortable
      />
      <Column
        body={() => <i className="pi pi-star" />}
        style={{ width: '40px' }}
      />
      <Column body={() => <MenuBody />} style={{ width: '40px' }} />
    </DataTable>
  );
};

export default DocumentTable;
