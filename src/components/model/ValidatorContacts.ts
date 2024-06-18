import { IOrder, IContacts } from '../../types/types';
import { Validator } from '../base/Validator';

export class ValidatorContacts extends Validator<IContacts> {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

  constructor() {
    super();
  }

  validate(order: IOrder): boolean {
    this.errors = {};

    if (!order.email) {
      this.errors.email = 'Необходимо указать email.';
    } else if (!this.emailRegex.test(order.email)) {
      this.errors.email = 'Email в формате: my.email@yandex.ru';
    }

    if (!order.phone) {
      this.errors.phone = 'Необходимо указать телефон.';
    } else if (!this.phoneRegex.test(order.phone)) {
      this.errors.phone = 'Телефон в формате: +7(999)999-99-99';
    }

    return Object.keys(this.errors).length === 0;
  }
}
