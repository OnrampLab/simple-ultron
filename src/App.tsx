import { Col, Row } from 'antd';
import React from 'react';
import { PromptManager } from './infrastructure/ui/components/PromptManager';
import { GlobalModalProvider } from './infrastructure/ui/providers/GlobalModalProvider';

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
