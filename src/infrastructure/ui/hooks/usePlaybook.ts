import { useEffect, useState } from 'react';
import { Playbook } from '../../../domain/entities/Playbook';
import { smsCadenceBuilder } from '../../../domain/playbookForms/smsCadenceBuilder';
import { playbookAdapter } from '../../adapters/PlaybookAdapter';

export const usePlaybook = (id?: number) => {
  const [playbook, setPlaybook] = useState<Playbook>();

  useEffect(() => {
    if (id) {
      setPlaybook(playbookAdapter.get(id));
    } else {
      setPlaybook(
        new Playbook(
          null,
          'My SMS Cadence Builder',
          smsCadenceBuilder.name,
          {},
          ''
        )
      );
    }
  }, [id]);

  const update = (playbook: Playbook) => {
    return playbookAdapter.update(playbook);
  };

  return {
    playbook,
    update,
  };
};
