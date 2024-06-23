import { IOrder, IContacts, EnEvents } from '../../types/types';
import { Validator } from '../base/Validator';

export class ValidatorContacts extends Validator<IContacts> {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

  validate(order: IOrder): boolean {
    this.errors = {};
    if (!order.email) {
      this.errors.email = 'Необходимо указать email.';
    } else if (!this.emailRegex.test(order.email)) {
      this.errors.email = 'Email должен быть в формате: my.email@yandex.ru';
    }
    if (!order.phone) {
      this.errors.phone = 'Необходимо указать телефон.';
    } else if (!this.phoneRegex.test(order.phone)) {
      this.errors.phone = 'Телефон должен быть в формате: +7(999)999-99-99';
    }
    this.emitChanges(EnEvents.ContactsErrors, this.errors);
    return Object.keys(this.getErrors()).length === 0;
  }
}
