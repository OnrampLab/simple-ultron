import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { PromptManager } from '../components/PromptManager';

export const PlaybookDetailPage: React.FC = () => {
  const { playbookId } = useParams();

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={24}>
        <PromptManager id={parseInt(playbookId || '1')} />
      </Col>
    </Row>
  );
};
