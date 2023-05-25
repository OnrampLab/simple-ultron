import { Col, Row } from 'antd';
import { PromptManager } from '../components/PromptManager';

export const PlaybookFormPage: React.FC = () => {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <PromptManager />
      </Col>
    </Row>
  );
};
