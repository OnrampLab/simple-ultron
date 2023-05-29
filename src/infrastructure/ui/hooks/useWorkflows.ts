import { useEffect, useState } from 'react';
import { Workflow } from '../../../domain/entities/Workflow';
import { workflowAdapter } from '../../adapters/WorkflowAdapter';

interface Parameters {}

export const useWorkflows = (parameters: Parameters = {}) => {
  const [workflows, setworkflows] = useState<Workflow[]>();

  useEffect(() => {
    setworkflows(workflowAdapter.list());
  }, []);

  return {
    workflows,
  };
};
