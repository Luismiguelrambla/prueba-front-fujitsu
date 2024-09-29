import React, { useState } from 'react';
import {
  DataTable,
  DataTableExpandedRows,
  DataTableFilterMeta,
  DataTableFilterMetaData,
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
import { useDocuments } from '../context/DocumentContext';
import './DocumentTable.css';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { updateFavoriteStatus } from '../services/documentService';

interface DocumentTableProps {
  isViewingEnabled: boolean;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ isViewingEnabled }) => {
  const { documents, loading, deleteDocuments, setDocuments } = useDocuments();
  const { t } = useTranslation();
  const [selectedDocuments, setSelectedDocuments] = useState<
    IDocument[] | null
  >(null);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const filteredDocuments = isViewingEnabled
    ? documents
    : documents.filter((doc) => doc.status !== 'Procesado');

  const expandAll = () => {
    const _expandedRows: DataTableExpandedRows = {};
    filteredDocuments.forEach((doc) => (_expandedRows[doc.id] = true));
    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => setExpandedRows(undefined);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    (_filters['global'] as DataTableFilterMetaData).value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const toggleFavorite = async (doc: IDocument) => {
    const updatedFavoriteStatus = !doc.favorite;
    try {
      const updatedDocuments = documents.map((document) =>
        document.id === doc.id
          ? { ...document, favorite: updatedFavoriteStatus }
          : document
      );
      setDocuments(updatedDocuments);

      await updateFavoriteStatus(doc.id, updatedFavoriteStatus);
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setDocuments(documents);
    }
  };

  return (
    <div className="document-table-container">
      <div className="back-title-search">
        <div className="back-button-title">
          <Button icon="pi pi-arrow-left" outlined />
          <div className="folder-name">
            <i className="pi pi-folder" />
            <span>Expedientes Material</span>
          </div>
        </div>

        <div className="document-table-search">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar por nombre"
            />
          </IconField>

          <Button icon="pi pi-filter" />
        </div>
      </div>
      <DataTable
        value={filteredDocuments}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={(e: IDocument) => <RowExpansion document={e} />}
        header={
          <DocumentTableHeader
            documentsCount={filteredDocuments.length}
            selectedDocumentsCount={selectedDocuments?.length ?? 0}
            expandAll={expandAll}
            collapseAll={collapseAll}
            onDelete={async () => {
              const idsToDelete = selectedDocuments?.map((doc) => doc.id);
              if (idsToDelete) {
                await deleteDocuments(idsToDelete);
                setSelectedDocuments(null);
              }
            }}
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
        filters={filters}
        globalFilterFields={['name']}
        emptyMessage="No documents found."
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
          body={(data) => (
            <span className="p-column-dateBody">{data.date}</span>
          )}
          sortable
        />
        <Column
          field="id"
          header="ID"
          body={(data) => <span className="p-column-idBody">{data.id}</span>}
          sortable
        />
        <Column
          body={(data) => (
            <Button
              icon={`pi pi-star${data.favorite ? '-fill' : ''}`}
              className="p-button-text"
              onClick={() => toggleFavorite(data)}
            />
          )}
          style={{ width: '40px' }}
        />
        <Column body={() => <MenuBody />} style={{ width: '40px' }} />
      </DataTable>
    </div>
  );
};

export default DocumentTable;
