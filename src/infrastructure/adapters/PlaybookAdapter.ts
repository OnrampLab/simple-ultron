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
    // NOTE: 兩邊同時存，等確定沒問題後，再把舊的方法移除
    this.storage.set('prompt-template', playbook.template || '');
    this.storage.set('prompt-form', playbook.formValues);

    const playbookStore = this.storage.get('playbook-store') || {};

    playbookStore[playbook.id] = playbook;
    this.storage.set('playbook-store', playbookStore);

    console.log('playbook updated', {
      playbook,
    });

    return playbook;
  }

  list() {
    return [this.get()];
  }

  get(id: ID = 1) {
    const playbookStore = this.storage.get('playbook-store') || {};
    const rawPlaybook = playbookStore[id];

    // NOTE: 如果有新的資料格式，就優先使用
    if (rawPlaybook) {
      return Playbook.of(rawPlaybook);
    }

    const values = this.storage.get('prompt-form');
    const storedTemplate = this.storage.get('prompt-template') || '';

    const playbook = new Playbook(
      1,
      'My SMS Cadence Builder',
      smsCadenceBuilder.name,
      values,
      storedTemplate
    );

    return playbook;
  }
}

export const playbookAdapter = new PlaybookAdapter(
  new LocalStorageAdapter<any>()
);
