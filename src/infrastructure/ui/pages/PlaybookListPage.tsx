import { Button, Card, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Link } from 'react-router-dom';
import { Playbook } from '../../../domain/entities/Playbook';
import { usePlaybooks } from '../hooks/usePlaybooks';

export const PlaybookListPage: React.FC = () => {
  const { playbooks } = usePlaybooks();

  const columns: ColumnsType<Playbook> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/playbooks/${record.id}`}>{text}</Link>
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
          <Link to={`/playbooks/${record.id}`}>Show</Link>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="SMS Cadence Builder"
      extra={
        <>
          <Button type="primary" href="#/playbooks/new">
            Create New Playbook
          </Button>
        </>
      }
    >
      <Table columns={columns} dataSource={playbooks} rowKey="id" />
    </Card>
  );
};
