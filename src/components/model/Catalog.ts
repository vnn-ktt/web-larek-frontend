import { IProduct, ICatalog, EnEvents } from '../../types/types';
import { Model } from '../base/Model';

export class Catalog extends Model<IProduct[]> implements ICatalog {
  protected products: IProduct[];

  assembleCatalog(products: IProduct[]): void {
    this.products = products.map((product) => {
      product.status = 'gallery';
      return product;
    });
    this.emitChanges(EnEvents.CatalogAssemble, this.products);
  }

  getAllProducts(): IProduct[] {
    return this.products;
  }
}
