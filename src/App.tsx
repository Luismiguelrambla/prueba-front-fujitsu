import { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './i18n';

import Header from './components/Header';
import NavTree from './components/NavTree';
import DocumentTable from './components/DocumentTable';
import { DocumentProvider } from './context/DocumentContext';
import './App.css';

function App(): JSX.Element {
  const [isViewingEnabled, setIsViewingEnabled] = useState<boolean>(true);

  const handleSwitchChange = (isChecked: boolean): void => {
    setIsViewingEnabled(isChecked);
  };

  return (
    <DocumentProvider>
      <>
        <Header onSwitchChange={handleSwitchChange} />
        <div className="page-container">
          <NavTree />
          <DocumentTable isViewingEnabled={isViewingEnabled} />
        </div>
      </>
    </DocumentProvider>
  );
}

export default App;
