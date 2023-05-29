import { KeyValueStorageService } from '../../application/ports';
import { Workflow } from '../../domain/entities/Workflow';
import { smsCadenceBuilder } from '../../domain/workflowForms/smsCadenceBuilder';

import { LocalStorageAdapter } from './LocalStorageAdapter';

class WorkflowAdapter {
  constructor(private storage: KeyValueStorageService<any>) {}

  create(workflow: Workflow): Workflow {
    return this.update(workflow);
  }

  update(workflow: Workflow): Workflow {
    // NOTE: 把舊的方法移除
    this.storage.remove('prompt-template');
    this.storage.remove('prompt-form');

    const workflowStore = this.storage.get('workflow-store') || {};

    if (workflow.id) {
      workflowStore[workflow.id] = workflow;
      this.storage.set('workflow-store', workflowStore);

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
    const workflowStore = this.storage.get('workflow-store') || {};

    Object.keys(workflowStore).forEach((id: string) => {
      workflowStore[id] = Workflow.of(workflowStore[id]);
    });

    return Object.values(workflowStore);
  }

  get(id: number) {
    const workflowStore = this.storage.get('workflow-store') || {};
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
}

export const workflowAdapter = new WorkflowAdapter(
  new LocalStorageAdapter<any>()
);
