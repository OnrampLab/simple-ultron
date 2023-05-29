import { useEffect, useState } from 'react';
import { Workflow } from '../../../domain/entities/Workflow';
import { smsCadenceBuilder } from '../../../domain/workflowForms/smsCadenceBuilder';
import { workflowAdapter } from '../../adapters/WorkflowAdapter';

export const useWorkflow = (id?: number) => {
  const [workflow, setWorkflow] = useState<Workflow>();

  useEffect(() => {
    if (id) {
      setWorkflow(workflowAdapter.get(id));
    } else {
      setWorkflow(
        new Workflow(
          null,
          'My SMS Cadence Builder',
          smsCadenceBuilder.name,
          {},
          ''
        )
      );
    }
  }, [id]);

  const update = (workflow: Workflow) => {
    return workflowAdapter.update(workflow);
  };

  return {
    workflow,
    update,
  };
};
