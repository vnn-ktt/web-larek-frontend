import { Model } from '../base/Model';
import {
  IOrder,
  TPaymentMethods,
  IPayment,
  IContacts,
} from '../../types/types';

export class Order extends Model<IOrder> implements IOrder {
  payment: TPaymentMethods = 'online';
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[] = [];

  getPaymentData(): Partial<IPayment> {
    return {
      payment: this.payment,
      address: this.address,
    };
  }

  getContactsData(): Partial<IContacts> {
    return {
      phone: this.phone,
      email: this.email,
    };
  }

  clearOrder(): void {
    this.payment = 'online';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.total = null;
    this.items = [];
  }
}
