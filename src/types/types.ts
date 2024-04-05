/*
 *Enums
 **/
export enum TProductCategory {
  soft = 'софт-скил',
  hard = 'хард-скил',
  additional = 'дополнительное',
  other = 'другое',
  button = 'кнопка',
}

export enum EventType {
  ModelChange = 'model:change',
  CatalogPainted = 'catalog:painted',
  ProductSelect = 'product:select',
  BasketAdd = 'basket:add',
  BasketRemove = 'basket:remove',
  BasketOpen = 'basket:open',
  BasketClose = 'basket:close',
  BasketChange = 'basket:change',
  PaymentFilled = 'payment:filled',
  ContactsFilled = 'contacts:filled',
  OrderPost = 'order:post',
  ModalOpen = 'modal:open',
  ModalClose = 'modal:close',
  FormChange = 'form:change',
}

/*
 *Types
 **/

export type TFormErrors = Partial<Record<keyof IOrder, string>>;

/*
 *Interfaces
 **/
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: TProductCategory;
}

export interface IBasket {
  products: IProduct[];
  getProducts(): IProduct[];
  getCost(): number;
  addProduct(product: IProduct): void;
  removeProduct(product: IProduct): void;
}

export interface IPayment {
  paymentMethod: string;
  address: string;
}

export interface IContacts {
  email: string;
  phone: string;
}

export interface ISuccessOrder {
  totalCost: number;
}

export interface IOrder extends IPayment, IContacts, ISuccessOrder {}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface ICatalog {
  products: IProduct[];
}
