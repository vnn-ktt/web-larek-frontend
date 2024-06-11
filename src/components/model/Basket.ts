import { Catalog } from './Catalog';
import { IProductList, IBasket, IEventEmitter } from '../../types/types';

export class Basket extends Catalog implements IBasket {
  constructor(data: Partial<IProductList>, eventEmitter: IEventEmitter) {
    super(data, eventEmitter);
  }

  getTotalCost(): number {
    const products = this.getAllProducts();
    const totalCost = products.reduce((acc, product) => acc + product.price, 0);
    return totalCost;
  }

  getProductsAmount(): number {
    const productsAmount = this.getAllProducts().length;
    return productsAmount;
  }
}
