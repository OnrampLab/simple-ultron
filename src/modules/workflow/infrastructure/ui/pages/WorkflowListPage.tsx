import { Link } from '@core/infrastructure/ui/components/Link';
import { useNavigate } from '@core/infrastructure/ui/hooks/useNavigate';
import { Button, Card, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Workflow } from '../../../domain/entities/Workflow';
import { useWorkflows } from '../hooks/useWorkflows';

export const WorkflowListPage: React.FC = () => {
  const navigate = useNavigate();
  const { workflows } = useWorkflows();

  const columns: ColumnsType<Workflow> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/workflows/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Form Name',
      dataIndex: 'formName',
      key: 'formName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/workflows/${record.id}`}>Show</Link>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Workflows"
      extra={
        <>
          <Button type="primary" onClick={() => navigate('/workflows/new')}>
            Create New Workflow
          </Button>
        </>
      }
    >
      <Table columns={columns} dataSource={workflows} rowKey="id" />
    </Card>
  );
};
