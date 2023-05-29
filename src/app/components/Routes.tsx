import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { routes } from '../config/routes';

const router = createHashRouter(routes);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
