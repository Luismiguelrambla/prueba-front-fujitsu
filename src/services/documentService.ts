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
