import { Col, Row } from 'antd';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MyLayout } from './MyLayout';
import { PromptManager } from './infrastructure/ui/components/PromptManager';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        path: '/',
        element: (
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <PromptManager />
            </Col>
          </Row>
        ),
      },
    ],
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
