import { KeyValueStorageService } from '../../application/ports';
import { Workflow } from '../../domain/entities/Workflow';
import { smsCadenceBuilder } from '../../domain/workflowForms/smsCadenceBuilder';

import { LocalStorageAdapter } from './LocalStorageAdapter';

const STORE_NAME = 'workflow-store';

class WorkflowAdapter {
  constructor(private storage: KeyValueStorageService<any>) {}

  create(workflow: Workflow): Workflow {
    return this.update(workflow);
  }

  update(workflow: Workflow): Workflow {
    const workflowStore = this.getStore();

    if (workflow.id) {
      workflowStore[workflow.id] = workflow;
      this.storage.set(STORE_NAME, workflowStore);

      console.log('workflow updated', {
        workflow,
      });
    } else {
      const lastId = Object.keys(workflowStore).sort().pop() || '0';

      workflow.id = parseInt(lastId) + 1;
      workflow.name = `${workflow.name} ${workflow.id}`;

      this.create(workflow);
    }

    return workflow;
  }

  list(query: any = {}): Workflow[] {
    const workflowStore = this.getStore();

    Object.keys(workflowStore).forEach((id: string) => {
      workflowStore[id] = Workflow.of(workflowStore[id]);
    });

    return Object.values(workflowStore);
  }

  get(id: number) {
    const workflowStore = this.getStore();
    const rawWorkflow = workflowStore[id];

    if (rawWorkflow) {
      return Workflow.of(rawWorkflow);
    }

    const workflow = new Workflow(
      null,
      'My SMS Cadence Builder',
      smsCadenceBuilder.name,
      {},
      ''
    );

    return workflow;
  }

  private getStore(): any {
    return this.storage.get(STORE_NAME) || {};
  }
}

export const workflowAdapter = new WorkflowAdapter(
  new LocalStorageAdapter<any>()
);
