import { IProduct, ICatalog, EnEvents } from '../../types/types';
import { Product } from './Product';
import { Model } from '../base/Model';

export class Catalog extends Model<IProduct[]> implements ICatalog {
  products: IProduct[];

  assembleCatalog(products: IProduct[]): void {
    this.products = products.map(
      (product) => new Product(product, this.eventEmitter),
    );
    this.emitChanges(EnEvents.CatalogAssemble, this.products);
  }

  addProduct(productData: Partial<IProduct>): void {
    const newProduct = new Product(productData, this.eventEmitter);
    this.products.push(newProduct as IProduct);
    this.emitChanges(EnEvents.CatalogChange, this.products);
  }

  removeProduct(productId: string): void {
    const index = this.products.findIndex(
      (product) => product.id === productId,
    );
    if (index !== -1) {
      this.products.splice(index, 1);
      this.emitChanges(EnEvents.CatalogChange, this.products);
    }
  }

  getProductById(productId: string): IProduct | undefined {
    return this.products.find((product) => product.id === productId);
  }

  getAllProducts(): IProduct[] {
    return this.products;
  }

  getProductIds(): string[] {
    return this.products.map((product) => product.id);
  }
}
