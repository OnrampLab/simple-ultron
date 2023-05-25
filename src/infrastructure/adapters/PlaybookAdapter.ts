import { KeyValueStorageService } from '../../application/ports';
import { Playbook } from '../../domain/entities/Playbook';
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

    if (playbook.id) {
      playbookStore[playbook.id] = playbook;
      this.storage.set('playbook-store', playbookStore);

      console.log('playbook updated', {
        playbook,
      });
    } else {
      const lastId = Object.keys(playbookStore).sort().pop() || '0';

      playbook.id = parseInt(lastId) + 1;
      playbook.name = `${playbook.name} ${playbook.id}`;

      this.create(playbook);
    }

    return playbook;
  }

  list(query: any = {}): Playbook[] {
    const playbookStore = this.storage.get('playbook-store') || {};

    Object.keys(playbookStore).forEach((id: string) => {
      playbookStore[id] = Playbook.of(playbookStore[id]);
    });

    return Object.values(playbookStore);
  }

  get(id: number) {
    const playbookStore = this.storage.get('playbook-store') || {};
    const rawPlaybook = playbookStore[id];

    if (rawPlaybook) {
      return Playbook.of(rawPlaybook);
    }

    const playbook = new Playbook(
      null,
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
