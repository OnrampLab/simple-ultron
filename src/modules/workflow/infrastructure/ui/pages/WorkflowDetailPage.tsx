import { useParams } from '@core/infrastructure/ui/hooks/useParams';
import { Col, Row } from 'antd';
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
