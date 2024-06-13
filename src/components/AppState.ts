// import { Product } from './Product';
// import { IOrder, TFormErrors } from '../types/types';

// export class AppState extends Product {
//   basket: Product[];
//   catalog: Product[];
//   order: IOrder;
//   formErrors: TFormErrors;

//   clearBasket() {
//     this.basket.forEach((item) => {
//       item.status = 'sell';
//     });
//     this.basket = [];
//   }

//   getTotal() {
//     return this.basket.reduce((a, c) => a + c.price, 0);
//   }

//   setCatalog(items: IProductItem[]) {
//     this.catalog = items.map((item) => new ProductItem(item, this.events));
//     this.emitChanges('catalog:install', { catalog: this.catalog });
//   }

//   setOrderField(field: keyof IOrderForm, value: string) {
//     this.order[field] = value;

//     if (this.validateOrder()) {
//       this.events.emit('order:ready', this.order);
//     }
//   }

//   validateOrder() {
//     const errors: typeof this.formErrorsOrder = {};

//     if (!this.order.address) {
//       errors.address = 'Необходимо указать адрес';
//     }
//     this.formErrorsOrder = errors;
//     this.events.emit('formErrorsOrder:change', this.formErrorsOrder);

//     return Object.keys(errors).length === 0;
//   }

//   setContactsField(field: keyof IContactsForm, value: string) {
//     this.order[field] = value;
//     if (this.validateContacts()) {
//       this.events.emit('contacts:ready', this.order);
//     }
//   }

//   validateContacts() {
//     const errors: typeof this.formErrorsContacts = {};

//     if (!this.order.email) {
//       errors.email = 'Необходимо указать email';
//     }
//     if (!this.order.phone) {
//       errors.phone = 'Необходимо указать телефон';
//     }
//     this.formErrorsContacts = errors;
//     this.events.emit('formErrorsContacts:change', this.formErrorsContacts);

//     return Object.keys(errors).length === 0;
//   }

//   togglebasket(item: ProductItem) {
//     if (item.status === 'sell' && item.price !== null) {
//       this.basket.push(item);
//       item.status = 'basket';
//       item.itemCount = this.basket.length;
//       this.emitChanges('basket:changed', this.basket);
//     } else if (item.status === 'basket') {
//       this.basket = this.basket.filter((it) => it !== item);
//       item.status = 'sell';
//       item.itemCount = this.basket.length;
//       this.emitChanges('basket:changed', this.basket);
//     }
//   }

//   getbasket(): ProductItem[] {
//     return this.basket;
//   }
// }
