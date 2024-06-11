import { Model } from '../base/Model';
import { Product } from './Product';
import {
  IProduct,
  IProductList,
  ICatalog,
  IEventEmitter,
  EnEvents,
} from '../../types/types';

export class Catalog extends Model<IProductList> implements ICatalog {
  protected _data: IProductList;

  constructor(data: Partial<IProductList>, eventEmitter: IEventEmitter) {
    super(data, eventEmitter);
    this._data = { products: [] };
  }

  addProduct(productData: Partial<IProduct>): void {
    const newProduct = new Product(productData, this._eventEmitter);
    this._data.products.push(newProduct.getData() as IProduct);
    this.emitChanges(EnEvents.CatalogChange, this._data);
  }

  addProducts(products: Partial<IProduct>[]): void {
    this._data.products = products.map(
      (productData) => new Product(productData, this._eventEmitter),
    );
    this.emitChanges(EnEvents.CatalogAssembled, this._data);
  }

  removeProduct(productId: string): void {
    const index = this._data.products.findIndex(
      (product) => product.id === productId,
    );
    if (index !== -1) {
      this._data.products.splice(index, 1);
      this.emitChanges(EnEvents.CatalogChange, this._data);
    }
  }

  getProductById(productId: string): IProduct | undefined {
    return this._data.products.find((product) => product.id === productId);
  }

  getAllProducts(): IProduct[] {
    return this._data.products;
  }

  updateProduct(productId: string, updatedData: Partial<IProduct>): void {
    const index = this._data.products.findIndex(
      (product) => product.id === productId,
    );
    if (index !== -1) {
      const updatedProductData = {
        ...this._data.products[index],
        ...updatedData,
      };
      const updatedProduct = new Product(
        updatedProductData,
        this._eventEmitter,
      );
      this._data.products[index] = updatedProduct.getData() as IProduct;
      this.emitChanges(EnEvents.CatalogChange, this._data);
    }
  }
}
