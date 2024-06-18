import { IOrder, IPayment } from '../../types/types';
import { Validator } from '../base/Validator';

export class ValidatorPayment extends Validator<IPayment> {
  private addressRegex = /^[а-яА-ЯёЁa-zA-Z0-9\s/.,-]{20,}$/;

  constructor() {
    super();
  }

  validate(order: IOrder): boolean {
    this.errors = {};

    if (!order.address) {
      this.errors.address = 'Необходимо указать адрес';
    } else if (!this.addressRegex.test(order.address)) {
      this.errors.address =
        'Адрес в формате: ул. Пушкина, д. 10, кв. 25, г. Москва';
    }

    if (!order.paymentMethod) {
      this.errors.paymentMethod = 'Необходимо указать вид оплаты';
    }

    return Object.keys(this.errors).length === 0;
  }
}
