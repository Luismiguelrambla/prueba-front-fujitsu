import React, { useEffect, useState } from 'react';
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
import pdfIcon from '../assets/pdf-icon.svg';
import { Tooltip } from 'primereact/tooltip';

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
  const [isSmallerWidth, setIsSmallerWidth] = useState<boolean>(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallerWidth(window.innerWidth < 1310);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredDocuments = isViewingEnabled
    ? documents
    : documents.filter((doc) => doc.validation > 2);

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
        <div className="back-button-title" role="navigation">
          <Button icon="pi pi-arrow-left" outlined aria-label="back button" />
          <div className="folder-name">
            <i className="pi pi-folder" aria-hidden="true" />
            <span>Expedientes Material</span>
          </div>
        </div>

        <div className="document-table-search">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder={t('header.search')}
              aria-label="header search"
            />
          </IconField>

          <Button icon="pi pi-sliders-h" aria-label="filter" />
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
        emptyMessage={t('header.emptyMessage')}
      >
        <Column
          selectionMode="multiple"
          style={{ width: '40px' }}
          aria-label="checkbox"
        />
        <Column expander style={{ width: '40px' }} aria-label="expand" />
        <Column
          body={() => <img src={pdfIcon} alt="pdf icon" />}
          style={{ width: '40px' }}
        />
        <Column
          field="name"
          header={t('documentTable.nameHeader')}
          body={(data) => <NameBody name={data.name} />}
          sortable
          aria-label="name header"
        />
        <Column
          field="tags"
          hidden={isSmallerWidth}
          header={t('documentTable.tagsHeader')}
          body={(data) => <TagBody tags={data.tags} />}
          sortable
          aria-label="tags header"
        />
        <Column
          field="status"
          header={t('documentTable.statusHeader')}
          body={(data) => (
            <>
              <span className="p-column-statusBody">{data.status}</span>
              {data.validation > 2 && (
                <div
                  className={`p-column-validation-container${data.validation > 3 ? '-high' : ''}`}
                >
                  <div className="p-validation">
                    <span>{data.validation} validaciones grafo pendientes</span>
                    <span>1 asignada a mí</span>
                  </div>
                  <Tooltip target=".info-validation" />
                  <i
                    className="info-validation pi pi-info-circle p-text-secondary p-overlay-badge"
                    data-pr-tooltip={`${t('documentTable.validation')} ${formattedDate}`}
                    data-pr-position="bottom"
                  />
                </div>
              )}
            </>
          )}
          sortable
          aria-label="status header"
        />
        <Column
          field="date"
          hidden={isSmallerWidth}
          header={t('documentTable.dateHeader')}
          body={(data) => (
            <span className="p-column-dateBody">{data.date}</span>
          )}
          sortable
          aria-label="date header"
        />
        <Column
          field="id"
          header="ID"
          body={(data) => <span className="p-column-idBody">{data.id}</span>}
          sortable
          aria-label="id header"
        />
        <Column
          body={(data) => (
            <Button
              icon={`pi pi-star${data.favorite ? '-fill' : ''}`}
              className="p-button-text"
              onClick={() => toggleFavorite(data)}
              aria-label={data.favorite ? 'remove favorite' : 'add favorite'}
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
