import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MyLayout } from './MyLayout';
import { PlaybookDetailPage } from './infrastructure/ui/pages/PlaybookDetailPage';
import { PlaybookListPage } from './infrastructure/ui/pages/PlaybookListPage';

const router = createBrowserRouter([
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
    ],
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
