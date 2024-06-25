import { EnEvents, IBasket, IProduct } from '../../types/types';
import { Catalog } from './Catalog';

export class Basket extends Catalog implements IBasket {
  protected products: IProduct[] = [];

  toggleProduct(product: IProduct): void {
    if (product.status === 'gallery' && product.price !== null) {
      this.products.push(product);
      product.status = 'basket';
      this.emitChanges(EnEvents.BasketChange, this.products);
    } else if (product.status === 'basket') {
      this.products = this.products.filter((item) => item !== product);
      product.status = 'gallery';
      this.emitChanges(EnEvents.BasketChange, this.products);
    }
  }

  getTotalCost(): number {
    const products = this.getAllProducts();
    const totalCost = products.reduce((acc, product) => acc + product.price, 0);
    return totalCost;
  }

  getProductsAmount(): number {
    return this.products.length;
  }

  clearBasket(): void {
    this.products.forEach((product) => {
      product.status = 'gallery';
    });
    this.products = [];
    this.emitChanges(EnEvents.BasketChange, this.products);
  }
}
