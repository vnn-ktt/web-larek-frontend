import { IOrder, IContacts, EnEvents } from '../../types/types';
import { Validator } from '../base/Validator';

export class ValidatorContacts extends Validator<IContacts> {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

  private validateEmail(email: string): boolean {
    if (!email) {
      this.errors.email = 'Необходимо указать email.';
    } else if (!this.emailRegex.test(email)) {
      this.errors.email = 'Email должен быть в формате: my.email@yandex.ru.';
    } else {
      delete this.errors.email;
    }
    return !this.errors.email;
  }

  private validatePhone(phone: string): boolean {
    if (!phone) {
      this.errors.phone = 'Необходимо указать телефон.';
    } else if (!this.phoneRegex.test(phone)) {
      this.errors.phone = 'Телефон должен быть в формате: +7(999)999-99-99.';
    } else {
      delete this.errors.phone;
    }
    return !this.errors.phone;
  }

  validate(order: IOrder): boolean {
    this.errors = {};
    const emailValid = this.validateEmail(order.email);
    const phoneValid = this.validatePhone(order.phone);
    this.emitChanges(EnEvents.ContactsErrors, this.errors);
    return emailValid && phoneValid;
  }
}
