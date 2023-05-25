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
    // NOTE: 把舊的方法移除
    this.storage.remove('prompt-template');
    this.storage.remove('prompt-form');

    const playbookStore = this.storage.get('playbook-store') || {};

    playbookStore[playbook.id] = playbook;
    this.storage.set('playbook-store', playbookStore);

    console.log('playbook updated', {
      playbook,
    });

    return playbook;
  }

  list(query: any = {}): Playbook[] {
    const playbookStore = this.storage.get('playbook-store') || {};

    Object.keys(playbookStore).forEach((id: string) => {
      playbookStore[id] = Playbook.of(playbookStore[id]);
    });

    return Object.values(playbookStore);
  }

  get(id: ID = 1) {
    const playbookStore = this.storage.get('playbook-store') || {};
    const rawPlaybook = playbookStore[id];

    if (rawPlaybook) {
      return Playbook.of(rawPlaybook);
    }

    const playbook = new Playbook(
      1,
      'My SMS Cadence Builder',
      smsCadenceBuilder.name,
      {},
      ''
    );

    return playbook;
  }
}

export const playbookAdapter = new PlaybookAdapter(
  new LocalStorageAdapter<any>()
);
