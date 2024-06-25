import {
  IContacts,
  IFormState,
  EnEvents,
  IEventEmitter,
  IFormContacts,
} from '../../types/types';
import { Form } from './Form';
import * as utils from '../../utils/utils';

export class FormContacts extends Form implements IFormContacts {
  protected _inputEmail: HTMLInputElement;
  protected _inputPhone: HTMLInputElement;

  constructor(container: HTMLFormElement, eventEmitter: IEventEmitter) {
    super(container, eventEmitter);
    this._inputEmail = utils.ensureElement<HTMLInputElement>(
      'input[name="email"]',
      container,
    );
    this._inputPhone = utils.ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      container,
    );
    this.setHandlers();
  }

  private setHandlers(): void {
    this._inputEmail.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const input = target.name as keyof IContacts;
      const value = target.value;
      this.eventEmitter.emit(EnEvents.ContactsEmailChange, {
        input,
        value,
      });
    });

    this._inputPhone.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const input = target.name as keyof IContacts;
      const value = target.value;
      this.eventEmitter.emit(EnEvents.ContactsPhoneChange, {
        input,
        value,
      });
    });
  }

  private setEmail(value: string): void {
    this._inputEmail.value = value;
  }

  private setPhone(value: string): void {
    this._inputPhone.value = value;
  }

  private build(data: Partial<IContacts> & Partial<IFormState>): this {
    const state = { errors: data.errors, valid: data.valid };

    if (data.email !== undefined) {
      this.setEmail(data.email);
    }
    if (data.phone !== undefined) {
      this.setPhone(data.phone);
    }

    this.setFormState(state);
    return this;
  }

  render(data: Partial<IContacts> & Partial<IFormState>): HTMLFormElement {
    return this.build(data).container as HTMLFormElement;
  }
}
