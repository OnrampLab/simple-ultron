import { Col, Row } from 'antd';
import React from 'react';
import { PromptManager } from './components/PromptManager';

const App: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <PromptManager />
      </Col>
    </Row>
  );
};

export default App;
