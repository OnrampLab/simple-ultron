import { WorkflowDetailPage } from '../../modules/workflow/infrastructure/ui/pages/WorkflowDetailPage';
import { WorkflowFormPage } from '../../modules/workflow/infrastructure/ui/pages/WorkflowFormPage';
import { WorkflowListPage } from '../../modules/workflow/infrastructure/ui/pages/WorkflowListPage';
import { MyLayout } from '../components/MyLayout';

export const routes = [
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
];
