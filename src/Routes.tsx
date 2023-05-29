import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { MyLayout } from './MyLayout';
import { WorkflowDetailPage } from './infrastructure/ui/pages/WorkflowDetailPage';
import { WorkflowFormPage } from './infrastructure/ui/pages/WorkflowFormPage';
import { WorkflowListPage } from './infrastructure/ui/pages/WorkflowListPage';

const router = createHashRouter([
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        path: '/workflows',
        element: <WorkflowListPage />,
      },
      {
        path: '/workflows/:workflowId',
        element: <WorkflowDetailPage />,
      },
      {
        path: '/workflows/new',
        element: <WorkflowFormPage />,
      },
    ],
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
