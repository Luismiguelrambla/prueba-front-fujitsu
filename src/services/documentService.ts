import axios from 'axios';
import { IDocument } from '../types/interfaces';

const API_URL = `https://${import.meta.env.VITE_API_KEY}.mockapi.io/api/v1/documents`;

export const fetchDocuments = async (): Promise<IDocument[]> => {
  try {
    const response = await axios.get<IDocument[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents', error);
    throw error;
  }
};

export const deleteDocuments = async (ids: string[]): Promise<void> => {
  try {
    const deletePromises = ids.map(id => axios.delete(`${API_URL}/${id}`));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error(`Error deleting documents with IDs ${ids.join(', ')}`, error);
    throw error;
  }
};

export const updateFavoriteStatus = async (id: string, favorite: boolean): Promise<IDocument> => {
  try {
    const response = await axios.put<IDocument>(`${API_URL}/${id}`, { favorite });
    return response.data;
  } catch (error) {
    console.error(`Error updating favorite status for document with ID ${id}`, error);
    throw error;
  }
};
