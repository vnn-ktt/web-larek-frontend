import { Model } from '../base/Model';
import { IOrder, TPaymentMethods, IProduct } from '../../types/types';

export class Order extends Model<IOrder> {
  paymentMethod: TPaymentMethods;
  address: string;
  email: string;
  phone: string;
  id: string;
  total: number;
  products: IProduct[];
}
