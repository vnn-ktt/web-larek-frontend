import { IProduct, ICart, IEventEmitter, EnEvents } from '../../types/types';
import { View } from '../base/View';
import { CardBasket } from './CardBasket';
import * as utils from '../../utils/utils';

export class Cart extends View<ICart> {
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

  protected updateProductList(
    products: IProduct[],
    template: HTMLTemplateElement,
  ) {
    if (products.length) {
      const productElements = products.map((product, index = 0) => {
        const container = utils.cloneTemplate(template);
        const cardBasket = new CardBasket(container, {
          onClick: () => {
            this.eventEmitter.emit(EnEvents.CartChange, product);
          },
        });
        product.index = (index + 1).toString();
        return cardBasket.render(product);
      });
      this._productList.replaceChildren(...productElements);
    } else {
      this._productList.replaceChildren(
        utils.createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста',
        }),
      );
    }
  }

  protected updateTotal(total: number | string) {
    this.setTextContent(this._total, `${total} синапсов`);
  }

  protected toggleButtonOrder(items: IProduct[]) {
    if (items.length) {
      this.toggleDisabled(this._buttonOrder, false);
    } else {
      this.toggleDisabled(this._buttonOrder, true);
    }
  }

  refreshCart(
    products: IProduct[],
    total: number | string,
    template: HTMLTemplateElement,
  ): void {
    this.updateProductList(products, template);
    this.updateTotal(total);
    this.toggleButtonOrder(products);
  }
}
