import { Form } from './Form';
import {
  IPayment,
  TPaymentMethods,
  IEventEmitter,
  IFormState,
  EnEvents,
} from '../../types/types';
import * as utils from '../../utils/utils';

export class FormPayment extends Form {
  protected _buttonCard: HTMLButtonElement;
  protected _buttonCash: HTMLButtonElement;

  constructor(container: HTMLFormElement, eventEmitter: IEventEmitter) {
    super(container, eventEmitter);
    this._buttonCard = utils.ensureElement<HTMLButtonElement>(
      '[name="card"]',
      container,
    );
    this._buttonCash = utils.ensureElement<HTMLButtonElement>(
      '[name="cash"]',
      container,
    );
    this.setHandlers();
  }

  private setHandlers(): void {
    this._buttonCash.addEventListener('click', () => {
      this.handlePaymentMethodChange(
        'offline',
        this._buttonCash,
        this._buttonCard,
      );
    });
    this._buttonCard.addEventListener('click', () => {
      this.handlePaymentMethodChange(
        'online',
        this._buttonCard,
        this._buttonCash,
      );
    });
    this.container.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const input = target.name as keyof IPayment;
      const value = target.value;
      this.eventEmitter.emit(EnEvents.PaymentAddressChange, {
        input,
        value,
      });
    });
  }

  private handlePaymentMethodChange(
    value: TPaymentMethods,
    activeButton: HTMLButtonElement,
    inactiveButton: HTMLButtonElement,
  ): void {
    activeButton.classList.add('button_alt-active');
    inactiveButton.classList.remove('button_alt-active');
    this.eventEmitter.emit(EnEvents.PaymentButtonChange, { value });
  }

  build(data: Partial<IPayment> & Partial<IFormState>): this {
    const state = { errors: data.errors, valid: data.valid };
    if (data.paymentMethod) {
      if (data.paymentMethod === 'online') {
        this._buttonCard.classList.add('button_alt-active');
        this._buttonCash.classList.remove('button_alt-active');
      } else if (data.paymentMethod === 'offline') {
        this._buttonCash.classList.add('button_alt-active');
        this._buttonCard.classList.remove('button_alt-active');
      }
    }
    if (data.address !== undefined) {
      (this.container.elements.namedItem('address') as HTMLInputElement).value =
        data.address;
    }
    this.setFormState(state);
    return this;
  }

  render(data: Partial<IPayment> & Partial<IFormState>): HTMLFormElement {
    return this.build(data).container as HTMLFormElement;
  }
}
