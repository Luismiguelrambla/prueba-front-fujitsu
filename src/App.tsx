import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import Header from './components/Header';
import DocumentTable from './components/DocumentTable';
import { useFetchDocuments } from './hooks/useFetchDocuments';

function App() {
  const { documents, loading } = useFetchDocuments();

  return (
    <>
      <Header />
      <DocumentTable documents={documents} loading={loading} />
    </>
  );
}

export default App;
