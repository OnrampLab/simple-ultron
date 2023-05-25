import { useEffect, useState } from 'react';
import { Playbook } from '../../../domain/entities/Playbook';
import { playbookAdapter } from '../../adapters/PlaybookAdapter';

interface Parameters {}

export const usePlaybooks = (parameters: Parameters = {}) => {
  const [playbooks, setplaybooks] = useState<Playbook[]>();

  useEffect(() => {
    setplaybooks(playbookAdapter.list());
  }, []);

  return {
    playbooks,
  };
};
