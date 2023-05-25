import { ID } from './types';

export class Playbook {
  constructor(
    public id: ID,
    public name: string,
    public formName: string,
    public formValues: any,
    public template: string
  ) {}
}
