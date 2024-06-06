/*
 *Enums
 **/

export enum EnProductCategories {
  soft = 'софт-скил',
  hard = 'хард-скил',
  additional = 'дополнительное',
  other = 'другое',
  button = 'кнопка',
}

export enum EnEvents {
  ModelChange = 'model:change',
  ProductChange = 'product:change',
  CatalogChange = 'catalog:change',
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

export type TApiListResponse<Type> = {
  total: number;
  items: Type[];
};

export type TApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type TEventName = string | RegExp;

export type TSubscriber = Function;

export type TEventEmitter = {
  eventName: TEventName;
  data: unknown;
};

export type TPaymentMethods = 'card' | 'cash';

export type TFormErrors = Partial<Record<keyof IOrder, string>>;

export type TProductStatus = 'basket' | 'showcase';

/*
 *Interfaces
 **/

/*Base*/

export interface IApi {
  baseUrl: string;
  get(uri: string): Promise<unknown>;
  post(uri: string, data: object, method: TApiPostMethods): Promise<unknown>;
}

export interface IEventEmitter {
  on<T extends object>(event: TEventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(
    event: string,
    context?: Partial<T>,
  ): (data: T) => void;
}

export interface IAppState {
  catalog: ICatalog;
  basket: IBasket;
  order: IOrder | null;
}

export interface IForm {
  reset(): void;
  validate(): boolean;
  submit(): Promise<boolean>;
}

export interface IFormState {
  valid: boolean;
  errors: TFormErrors[];
}

/*Model Components*/

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: EnProductCategories;
}

export interface ICatalog {
  products: IProduct[];
}

export interface IBasket {
  products: IProduct[];
  getProducts(): IProduct[];
  getTotal(): number;
  getAmount(): number;
  addProduct(product: IProduct): void;
  removeProduct(product: IProduct): void;
  clearBasket(): void;
}

export interface IPayment {
  paymentMethod: TPaymentMethods;
  address: string;
}

export interface IContacts {
  email: string;
  phone: string;
}

export interface ISuccessOrder {
  id: string;
  total: number;
}

export interface IOrder extends IPayment, IContacts, ISuccessOrder {}

/*View Components */

export interface IPage {
  catalog: HTMLElement[];
  productsCounter: number;
}

export interface IBasketView {
  list: HTMLElement[];
  total: number;
}

/* API */
export interface IWeblarekApi {
  getProductList: () => Promise<IProduct[]>;
  orderResult: (order: IOrder) => Promise<ISuccessOrder>;
}
