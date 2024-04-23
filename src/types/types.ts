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

/*
 *Interfaces
 **/

/*Base*/

export interface IApi {
  baseUrl: string;
  get(uri: string): Promise<object>;
  post(uri: string, data: object, method: TApiPostMethods): Promise<object>;
}

export interface IEventEmitter {
  on<T extends object>(event: TEventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(
    event: string,
    context?: Partial<T>,
  ): (data: T) => void;
}

export interface IModel<T> {
  setData(data: Partial<T>): void;
  getData(): Partial<T> | null;
  updateData(updatedData: Partial<T>): void;
  clearData(): void;
}

export interface IView<T> {
  setText(element: HTMLElement, value: unknown): void;
  toggleClass(element: HTMLElement, className: string, force?: boolean): void;
  toggleDisabled(element: HTMLElement, state: boolean): void;
  toggleHidden(element: HTMLElement): void;
  render(data?: Partial<T>): HTMLElement;
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
  selected: boolean;
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
