import React from 'react';
import { Routes } from './Routes';
import { GlobalModalProvider } from './infrastructure/ui/providers/GlobalModalProvider';

const App: React.FC = () => {
  return (
    <GlobalModalProvider>
      <Routes />
    </GlobalModalProvider>
  );
};

export default App;
