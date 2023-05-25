import { useEffect, useState } from 'react';
import { Playbook } from '../../../domain/entities/Playbook';
import { playbookAdapter } from '../../adapters/PlaybookAdapter';

interface Parameters {}

export const usePlaybook = (parameters: Parameters = {}) => {
  const [playbook, setplaybook] = useState<Playbook>();

  useEffect(() => {
    setplaybook(playbookAdapter.get());
  }, []);

  const update = (playbook: Playbook) => {
    playbookAdapter.update(playbook);
  };

  return {
    playbook,
    update,
  };
};
