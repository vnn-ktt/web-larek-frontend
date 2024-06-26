import { IProduct, ICart, IEventEmitter, EnEvents } from '../../types/types';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class Cart extends View<ICart> implements ICart {
  protected _productList: HTMLElement;
  protected _buttonOrder: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, protected eventEmitter: IEventEmitter) {
    super(container);
    this._productList = utils.ensureElement<HTMLElement>(
      '.basket__list',
      container,
    );
    this._total = this.container.querySelector('.basket__price');
    this._buttonOrder = this.container.querySelector('.basket__button');
    if (this._buttonOrder) {
      this._buttonOrder.addEventListener('click', () => {
        eventEmitter.emit(EnEvents.OrderCreate);
      });
    }
  }

  private updateTotal(total: number | string): void {
    this.setTextContent(this._total, `${total} синапсов`);
  }

  private toggleButtonOrder(items: IProduct[]): void {
    if (items.length) {
      this.toggleDisabled(this._buttonOrder, false);
    } else {
      this.toggleDisabled(this._buttonOrder, true);
    }
  }

  setProductList(products: HTMLElement[]): void {
    if (products.length) {
      this._productList.replaceChildren(...products);
    } else {
      this._productList.replaceChildren(
        utils.createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста',
        }),
      );
    }
  }

  refreshCart(products: IProduct[], total: number | string): void {
    this.updateTotal(total);
    this.toggleButtonOrder(products);
  }
}
