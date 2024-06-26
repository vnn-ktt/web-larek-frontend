import { IEventEmitter, IForm, IFormState } from '../../types/types';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class Form extends View<IFormState> implements IForm {
  protected _errors: HTMLElement;
  protected _submitButton: HTMLButtonElement;

  constructor(
    protected container: HTMLFormElement,
    protected eventEmitter: IEventEmitter,
  ) {
    super(container);
    this._errors = utils.ensureElement<HTMLElement>(
      '.form__errors',
      this.container,
    );
    this._submitButton = utils.ensureElement<HTMLButtonElement>(
      'button[type=submit]',
      this.container,
    );
    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.eventEmitter.emit(`${this.container.name}:submit`);
    });
  }

  private setSumbitDisable(valid: boolean): void {
    this._submitButton.disabled = !valid;
  }

  private setErrors(errors: string): void {
    this.setTextContent(this._errors, errors);
  }

  setFormState(state: IFormState): void {
    const { errors, valid } = state;
    this.setErrors(errors);
    this.setSumbitDisable(valid);
  }
}
