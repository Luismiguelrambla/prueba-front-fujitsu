import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import DocumentTable from './components/DocumentTable';
import { useFetchDocuments } from './hooks/useFetchDocuments';

function App() {
  const { documents, loading } = useFetchDocuments();

  return (
    <>
      <DocumentTable documents={documents} loading={loading} />
    </>
  );
}

export default App;
