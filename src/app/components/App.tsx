import React from 'react';
import { GlobalModalProvider } from '../../modules/workflow/infrastructure/ui/providers/GlobalModalProvider';
import { Routes } from './Routes';

const App: React.FC = () => {
  return (
    <GlobalModalProvider>
      <Routes />
    </GlobalModalProvider>
  );
};

export default App;
