import { Model } from './base/Model';
import { Product } from './Product';
import { IProduct, ICatalog, IEventEmitter, EnEvents } from '../types/types';

export class Catalog extends Model<ICatalog> {
  protected products: Product[];

  constructor(eventEmitter: IEventEmitter) {
    super({ products: [] }, eventEmitter);
    this.products = [];
  }

  addProduct(productData: Partial<IProduct>): void {
    const product = new Product(productData, this.eventEmitter);
    this.products.push(product);
    this.emitChanges(EnEvents.CatalogChange);
  }

  removeProduct(productId: string): void {
    this.products = this.products.filter((product) => product.id !== productId);
    this.emitChanges(EnEvents.CatalogChange);
  }

  getProduct(productId: string): Product | undefined {
    return this.products.find((product) => product.id === productId);
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  updateProduct(productId: string, updatedData: Partial<IProduct>): void {
    const product = this.getProduct(productId);
    if (product) {
      product.updateData(updatedData);
      this.emitChanges(EnEvents.CatalogChange);
    }
  }
}
