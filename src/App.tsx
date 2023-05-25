import { Col, Row } from 'antd';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PromptManager } from './infrastructure/ui/components/PromptManager';
import { GlobalModalProvider } from './infrastructure/ui/providers/GlobalModalProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <PromptManager />
        </Col>
      </Row>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <GlobalModalProvider>
      <RouterProvider router={router} />
    </GlobalModalProvider>
  );
};

export default App;
