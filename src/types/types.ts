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
  PaymentFilled = 'order:submit',
  ContactsEmailChange = 'contacts-email:change',
  ContactsPhoneChange = 'contacts-phone:change',
  ContactsErrors = 'contacts-errors:change',
  ContactsFilled = 'contacts:submit',
  OrderPost = 'order:post',
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

export interface IOnClick {
  onClick: (event: Event) => void;
}

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
  price: number | null;
  image: string;
  category: EnProductCategories;
  status: TProductStatus;
  index: string;
}

export interface ICatalog {
  assembleCatalog(products: Partial<IProduct>[]): void;
  getAllProducts(): IProduct[];
}

export interface IBasket {
  toggleProduct(product: IProduct): void;
  getAllProducts(): IProduct[];
  getProductsAmount(): number;
  getProductIds(): string[];
  getTotalCost(): number;
  clearBasket(): void;
}

export interface IFormState {
  valid: boolean;
  errors: string;
}

export interface IOrder extends IPayment, IContacts, IPurchase {
  items: string[];
  getPaymentData(): Partial<IPayment>;
  getContactsData(): Partial<IContacts>;
  clearOrder(): void;
}

export interface IOrderResult {
  id: string;
  total: number;
}

/* Form */

export interface IPayment {
  payment: TPaymentMethods;
  address: string;
}

export interface IContacts {
  email: string;
  phone: string;
}

export interface IPurchase {
  total: number;
}

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

/*View Components */

export interface IModal {
  open(): void;
  close(): void;
  isOpen(): boolean;
  replaceContent(content: HTMLElement): void;
}

export interface IPage {
  replaceGallery(items: HTMLElement[]): void;
  replaceCartCounter(value: number): void;
  togglePageLock(value: boolean): void;
}

export interface ICard {
  render(data: IProduct): HTMLElement;
}

export interface ICardPreview extends ICard {
  toggleButton(status: TProductStatus): void;
}

export interface ICart {
  setProductList(products: HTMLElement[]): void;
  removeProducts(): void;
  refreshCart(products: IProduct[], total: number | string): void;
}

export interface IForm {
  setFormState(state: IFormState): void;
}

export interface IFormPayment {
  render(data: Partial<IPayment> & Partial<IFormState>): HTMLFormElement;
}

export interface IFormContacts {
  getPhoneField(): HTMLElement;
  render(data: Partial<IContacts> & Partial<IFormState>): HTMLFormElement;
}
