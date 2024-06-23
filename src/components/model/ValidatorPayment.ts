import { IOrder, IPayment, EnEvents } from '../../types/types';
import { Validator } from '../base/Validator';

export class ValidatorPayment extends Validator<IPayment> {
  private addressRegex = /^[а-яА-ЯёЁa-zA-Z0-9\s/.,-]{10,}$/;

  validate(order: IOrder): boolean {
    this.errors = {};
    if (!order.paymentMethod) {
      this.errors.paymentMethod = 'Необходимо указать вид оплаты';
    }
    if (!order.address) {
      this.errors.address = 'Необходимо указать адрес';
    } else if (!this.addressRegex.test(order.address)) {
      this.errors.address =
        'Адрес должен быть не менее 10 символов, среди который могут быть , . - и цифры.';
    }
    this.emitChanges(EnEvents.PaymentErrors, this.errors);
    return Object.keys(this.getErrors()).length === 0;
  }
}
