import {
  IPayment,
  TPaymentMethods,
  IFormState,
  IFormPayment,
  EnEvents,
  IEventEmitter,
} from '../../types/types';
import { Form } from './Form';
import * as utils from '../../utils/utils';

export class FormPayment extends Form implements IFormPayment {
  protected _buttonOnline: HTMLButtonElement;
  protected _buttonOffline: HTMLButtonElement;
  protected _inputAddress: HTMLInputElement;

  constructor(container: HTMLFormElement, eventEmitter: IEventEmitter) {
    super(container, eventEmitter);
    this._buttonOnline = utils.ensureElement<HTMLButtonElement>(
      '[name="card"]',
      container,
    );
    this._buttonOffline = utils.ensureElement<HTMLButtonElement>(
      '[name="cash"]',
      container,
    );
    this._inputAddress = utils.ensureElement<HTMLInputElement>(
      '[name="address"]',
      container,
    );
    this.setHandlers();
  }

  private setHandlers(): void {
    this._buttonOffline.addEventListener('click', () => {
      this.handlePaymentMethodChange(
        'offline',
        this._buttonOffline,
        this._buttonOnline,
      );
    });
    this._buttonOnline.addEventListener('click', () => {
      this.handlePaymentMethodChange(
        'online',
        this._buttonOnline,
        this._buttonOffline,
      );
    });
    this._inputAddress.addEventListener('input', (event: Event) => {
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

  private build(data: Partial<IPayment> & Partial<IFormState>): this {
    const state = { errors: data.errors, valid: data.valid };
    if (data.payment) {
      if (data.payment === 'online') {
        this._buttonOnline.classList.add('button_alt-active');
        this._buttonOffline.classList.remove('button_alt-active');
      } else if (data.payment === 'offline') {
        this._buttonOffline.classList.add('button_alt-active');
        this._buttonOnline.classList.remove('button_alt-active');
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
