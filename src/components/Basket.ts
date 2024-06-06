import { IProduct, IBasket, IEventEmitter, EnEvents } from '../types/types';
import { Product } from './Product';
import { Catalog } from './Catalog';

export class Basket extends Catalog implements IBasket {
  products: Product[];

  constructor(eventEmitter: IEventEmitter) {
    super(eventEmitter);
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getTotal(): number {
    return this.products.reduce(
      (total, product) => total + (product.price || 0),
      0,
    );
  }

  getAmount(): number {
    return this.products.length;
  }

  addProduct(productData: IProduct): void {
    const product = new Product(productData, this.eventEmitter);
    this.products.push(product);
    this.emitChanges();
  }

  removeProduct(product: IProduct): void {
    this.products = this.products.filter(
      (basketProduct) => basketProduct.id !== product.id,
    );
    this.emitChanges();
  }

  clearBasket(): void {
    this.products = [];
    this.emitChanges();
  }

  private emitChanges(): void {
    this.eventEmitter.emit(EnEvents.BasketChange, {
      products: this.getProducts(),
    });
  }
}
