import { Button, Card, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Playbook } from '../../../domain/entities/Playbook';
import { usePlaybooks } from '../hooks/usePlaybooks';

export const PlaybookListPage: React.FC = () => {
  const { playbooks } = usePlaybooks();

  const columns: ColumnsType<Playbook> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={`/playbooks/${record.id}`}>{text}</a>,
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
          <a href={`/playbooks/${record.id}`}>Show</a>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="SMS Cadence Builder"
      extra={
        <>
          <Button type="primary" href="/playbooks/new">
            Create New Playbook
          </Button>
        </>
      }
    >
      <Table columns={columns} dataSource={playbooks} rowKey="id" />
    </Card>
  );
};
