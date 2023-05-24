import { Col, Row } from 'antd';
import React from 'react';
import { PromptManager } from './components/PromptManager';
import { GlobalModalProvider } from './providers/GlobalModalProvider';

const App: React.FC = () => {
  return (
    <GlobalModalProvider>
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <PromptManager />
        </Col>
      </Row>
    </GlobalModalProvider>
  );
};

export default App;
