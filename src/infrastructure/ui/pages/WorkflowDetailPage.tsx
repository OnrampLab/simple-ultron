import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { PromptManager } from '../components/PromptManager';

export const WorkflowDetailPage: React.FC = () => {
  const { workflowId } = useParams();

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <PromptManager id={parseInt(workflowId || '1')} />
      </Col>
    </Row>
  );
};
