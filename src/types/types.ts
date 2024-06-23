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
  ProductChange = 'product:change',
  ProductToggle = 'product:toggle',
  CatalogChange = 'catalog:change',
  CatalogAssemble = 'catalog:assemble',
  BasketChange = 'basket:change',
  ModalOpen = 'modal:open',
  ModalClose = 'modal:close',
  CardOpen = 'card:open',
  CartOpen = 'cart:open',
  CartChange = 'cart:change',
  OrderCreate = 'order:create',

  PaymentButtonChange = 'payment:change',
  PaymentAddressChange = 'payment-address:change',
  PaymentErrors = 'payment-errors:change',
  PaymentFilled = 'payment:filled',

  ContactsErrors = 'contacts-errors:change',

  ContactsFilled = 'contacts:filled',
  OrderPost = 'order:post',
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

export type TPaymentMethods = 'online' | 'offline';

export type TProductStatus = 'basket' | 'gallery';

/*
 *Interfaces
 **/

/* Events */

export interface IEventEmitter {
  on<T extends object>(event: TEventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(
    event: string,
    context?: Partial<T>,
  ): (data: T) => void;
}

/*Model Components*/

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: EnProductCategories;
  status: TProductStatus;
  index: string;
}

export interface ICatalog {
  assembleCatalog(products: Partial<IProduct>[]): void;
  addProduct(productData: Partial<IProduct>, status: TProductStatus): void;
  removeProduct(productId: string): void;
  getProductById(productId: string): IProduct | undefined;
  getAllProducts(): IProduct[];
  updateProduct(productId: string, updatedData: Partial<IProduct>): void;
}

export interface IBasket extends ICatalog {
  getTotalCost(): number;
  getProductsAmount(): number;
}

/*View Components */

export interface IPage {
  replaceGallery(items: HTMLElement[]): void;
  replaceCartCounter(value: number): void;
  togglePageLock(value: boolean): void;
}

export interface ICard {
  render(data: IProduct): HTMLElement;
}

export interface ICardClickHandler {
  onClick: (event: Event) => void;
}

export interface IModal {
  open(): void;
  close(): void;
  replaceContent(content: HTMLElement): void;
  toggleIsOpened(value: boolean): void;
}

export interface ICart {
  products: HTMLElement[];
  total: number | string;
}

/* Form, Order */

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IPayment {
  paymentMethod: TPaymentMethods;
  address: string;
}

export interface IContacts {
  email: string;
  phone: string;
}

export interface IPurchase {
  total: number;
  products: IProduct[];
}

export interface IOrder extends IPayment, IContacts, IPurchase {}

/* API Components */

export interface IApi {
  baseUrl: string;
  get(uri: string): Promise<unknown>;
  post(uri: string, data: object, method: TApiPostMethods): Promise<unknown>;
}

export interface IWeblarekApi {
  getProductList: () => Promise<IProduct[]>;
  postOrder: (order: IOrder) => Promise<IPurchase>;
}
