import { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './i18n';
import Header from './components/Header';
import DocumentTable from './components/DocumentTable';
import { useFetchDocuments } from './hooks/useFetchDocuments';
import './App.css';

function App() {
  const { documents, loading } = useFetchDocuments();
  const [isViewingEnabled, setIsViewingEnabled] = useState<boolean>(false);

  const handleSwitchChange = (isChecked: boolean) => {
    setIsViewingEnabled(isChecked);
  };

  const filteredDocuments = isViewingEnabled
    ? documents
    : documents.filter((doc) => doc.status !== 'Procesado');

  return (
    <>
      <Header onSwitchChange={handleSwitchChange} />
      <DocumentTable documents={filteredDocuments} loading={loading} />
    </>
  );
}

export default App;
