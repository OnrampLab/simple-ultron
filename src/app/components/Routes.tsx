import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { WorkflowDetailPage } from '../../modules/workflow/infrastructure/ui/pages/WorkflowDetailPage';
import { WorkflowFormPage } from '../../modules/workflow/infrastructure/ui/pages/WorkflowFormPage';
import { WorkflowListPage } from '../../modules/workflow/infrastructure/ui/pages/WorkflowListPage';
import { MyLayout } from './MyLayout';

const router = createHashRouter([
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <WorkflowListPage />,
      },
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
