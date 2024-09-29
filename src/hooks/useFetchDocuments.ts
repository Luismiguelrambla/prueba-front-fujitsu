import { useState, useEffect } from 'react';
import { fetchDocuments } from '../services/documentService';
import IDocument from '../types/interfaces';

export const useFetchDocuments = () => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDocuments = async () => {
      const data = await fetchDocuments();
      setDocuments(data as IDocument[]);
      setLoading(false);
    };

    getDocuments();
  }, []);

  return { documents, loading };
};
