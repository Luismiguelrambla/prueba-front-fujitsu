import { mockDocuments } from '../utils/mocks/mockData';

export const fetchDocuments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDocuments);
    }, 1000);
  });
};