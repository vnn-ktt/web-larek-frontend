import { Form } from './Form';
import { IContacts, IEventEmitter } from '../../types/types';

export class FormContacts extends Form {
  constructor(container: HTMLFormElement, eventEmitter: IEventEmitter) {
    super(container, eventEmitter);
  }
  setEmail(value: string) {
    (
      this.container.querySelector<HTMLInputElement>(
        'input[name="email"]',
      ) as HTMLInputElement
    ).value = value;
  }
  setPhone(value: string) {
    (
      this.container.querySelector<HTMLInputElement>(
        'input[name="phone"]',
      ) as HTMLInputElement
    ).value = value;
  }
}
