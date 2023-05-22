import { Col, Row } from 'antd';
import React from 'react';
import PromptForm from './PromptForm';

const App: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <PromptForm />
      </Col>
    </Row>
  );
};

export default App;
