import { IProduct, IOnClick } from '../../types/types';
import { Card } from './Card';
import * as utils from '../../utils/utils';

export class CardBasket extends Card {
  protected _index: HTMLElement;
  protected _buttonDelete: HTMLButtonElement;

  constructor(container: HTMLElement, clickHandler?: IOnClick) {
    super(container);
    this._index = utils.ensureElement<HTMLElement>(
      '.basket__item-index',
      container,
    );
    this._buttonDelete = utils.ensureElement<HTMLButtonElement>(
      '.basket__item-delete',
      container,
    );
    if (clickHandler.onClick) {
      this._buttonDelete.addEventListener('click', clickHandler.onClick);
    }
  }

  private setIndex(index: string): void {
    this.setTextContent(this._index, index);
  }

  build(data: IProduct): this {
    super.build(data);
    this.setIndex(data.index);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
