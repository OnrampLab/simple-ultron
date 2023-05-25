import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { MyLayout } from './MyLayout';
import { PlaybookDetailPage } from './infrastructure/ui/pages/PlaybookDetailPage';
import { PlaybookFormPage } from './infrastructure/ui/pages/PlaybookFormPage';
import { PlaybookListPage } from './infrastructure/ui/pages/PlaybookListPage';

const router = createHashRouter([
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        path: '/playbooks',
        element: <PlaybookListPage />,
      },
      {
        path: '/playbooks/:playbookId',
        element: <PlaybookDetailPage />,
      },
      {
        path: '/playbooks/new',
        element: <PlaybookFormPage />,
      },
    ],
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
