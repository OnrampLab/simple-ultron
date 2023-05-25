import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MyLayout } from './MyLayout';
import { PlaybookDetailPage } from './infrastructure/ui/pages/PlaybookDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MyLayout />,
    children: [
      {
        path: '/',
        element: <PlaybookDetailPage />,
      },
    ],
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
