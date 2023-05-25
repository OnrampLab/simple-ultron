import { KeyValueStorageService } from '../../application/ports';
import { Playbook } from '../../domain/entities/Playbook';
import { ID } from '../../domain/entities/types';
import { smsCadenceBuilder } from '../../domain/playbookForms/smsCadenceBuilder';

import { LocalStorageAdapter } from './LocalStorageAdapter';

class PlaybookAdapter {
  constructor(private storage: KeyValueStorageService<any>) {}

  create(playbook: Playbook): Playbook {
    return this.update(playbook);
  }

  update(playbook: Playbook): Playbook {
    this.storage.set('prompt-template', playbook.template || '');

    const json = JSON.stringify(playbook.formValues);
    this.storage.set('prompt-form', json);

    console.log('playbook updated', {
      playbook,
    });

    return playbook;
  }

  list() {
    return [this.get()];
  }

  get(id: ID = 1) {
    const values = this.storage.get('prompt-form');
    const storedTemplate = this.storage.get('prompt-template') || '';

    const playbook = new Playbook(
      1,
      'My SMS Cadence Builder',
      smsCadenceBuilder.name,
      values,
      storedTemplate
    );

    console.debug('playbook fetched', playbook);

    return playbook;
  }
}

export const playbookAdapter = new PlaybookAdapter(
  new LocalStorageAdapter<any>()
);
