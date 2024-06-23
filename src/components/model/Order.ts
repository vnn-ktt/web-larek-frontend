import { Model } from '../base/Model';
import {
  IOrder,
  TPaymentMethods,
  IProduct,
  IPayment,
  IContacts,
} from '../../types/types';

export class Order extends Model<IOrder> {
  paymentMethod: TPaymentMethods = 'online';
  address: string;
  email: string;
  phone: string;
  total: number;
  products: IProduct[] = [];

  getPaymentData(): Partial<IPayment> {
    return {
      paymentMethod: this.paymentMethod,
      address: this.address,
    };
  }

  getContactsData(): Partial<IContacts> {
    return {
      phone: this.phone,
      email: this.email,
    };
  }
}
