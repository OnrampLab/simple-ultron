import { ID } from './types';

export class Playbook {
  constructor(
    public id: ID | null,
    public name: string,
    public formName: string,
    public formValues: any,
    public template: string
  ) {}

  public static of(object: any) {
    return new Playbook(
      object.id,
      object.name,
      object.formName,
      object.formValues,
      object.template
    );
  }
}
