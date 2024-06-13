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
  CatalogAssembled = 'catalog:assembled',
  CardSelect = 'card:select',
  ModalOpen = 'modal:open',
  ModalClose = 'modal:close',

  CartOpen = 'cart:open',
  CartClose = 'cart:close',
  CartChange = 'cart:change',

  PaymentFilled = 'payment:filled',
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

export type TPaymentMethods = 'card' | 'cash';

export type TProductStatus = 'basket' | 'gallery';

export type TFormErrors = Partial<Record<keyof IOrder, string>>;

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
}

export interface IProductList {
  products: IProduct[];
}

export interface ICatalog {
  addProduct(productData: Partial<IProduct>): void;
  addProducts(products: Partial<IProduct>[]): void;
  removeProduct(productId: string): void;
  getProductById(productId: string): IProduct | undefined;
  getAllProducts(): IProduct[];
  updateProduct(productId: string, updatedData: Partial<IProduct>): void;
}

export interface IBasket extends ICatalog {
  getTotalCost(): number;
  getProductsAmount(): number;
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
  replaceGallery(items: HTMLElement[]): void;
  replaceCartCounter(value: number): void;
  togglePageLock(value: boolean): void;
}

export interface ICard {
  render(data: IProduct): HTMLElement;
}

export interface ICardClickHandler {
  onClick: (event: MouseEvent) => void;
}

export interface IModal {
  open(): void;
  close(): void;
  replaceContent(content: HTMLElement): void;
  toggleIsOpened(value: boolean): void;
}

export interface ICart {
  list: HTMLElement[];
  total: number;
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

/* API Components */

export interface IApi {
  baseUrl: string;
  get(uri: string): Promise<unknown>;
  post(uri: string, data: object, method: TApiPostMethods): Promise<unknown>;
}

export interface IWeblarekApi {
  getProductList: () => Promise<IProduct[]>;
  postOrder: (order: IOrder) => Promise<ISuccessOrder>;
}
