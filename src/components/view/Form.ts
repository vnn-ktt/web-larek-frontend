import { View } from '../base/View';
import { IEventEmitter, IFormState } from '../../types/types';
import * as utils from '../../utils/utils';

export class Form extends View<IFormState> {
  protected _errors: HTMLElement;
  protected _submit: HTMLButtonElement;

  constructor(
    protected container: HTMLFormElement,
    protected eventEmitter: IEventEmitter,
  ) {
    super(container);
    this._errors = utils.ensureElement<HTMLElement>(
      '.form__errors',
      this.container,
    );
    this._submit = utils.ensureElement<HTMLButtonElement>(
      'button[type=submit]',
      this.container,
    );
    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.eventEmitter.emit(`${this.container.name}:submit`);
    });
  }

  setSumbitDisable(valid: boolean) {
    this._submit.disabled = !valid;
  }

  setErrors(errors: string[]) {
    this.setTextContent(this._errors, errors);
  }

  setFormState(state: IFormState) {
    const { errors, valid } = state;
    this.setErrors(errors);
    this.setSumbitDisable(valid);
  }
}
