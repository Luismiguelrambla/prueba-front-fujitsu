import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchDocuments, deleteDocuments } from '../services/documentService';
import { IDocument } from '../types/interfaces';

interface DocumentContextType {
  documents: IDocument[];
  loading: boolean;
  deleteDocuments: (ids: string[]) => Promise<void>;
  setDocuments: React.Dispatch<React.SetStateAction<IDocument[]>>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedDocuments = await fetchDocuments();
      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocuments = async (ids: string[]) => {
    try {
      await deleteDocuments(ids);
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => !ids.includes(doc.id))
      );
    } catch (error) {
      console.error('Error deleting documents:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DocumentContext.Provider
      value={{
        documents,
        loading,
        deleteDocuments: handleDeleteDocuments,
        setDocuments,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
