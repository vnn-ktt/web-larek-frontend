import { IProduct, ICardClickHandler, TProductStatus } from '../../types/types';
import { CardCatalog } from './CardCatalog';
import * as utils from '../../utils/utils';

export class CardPreview extends CardCatalog {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(container: HTMLElement, clickHandler?: ICardClickHandler) {
    super(container);
    this._description = utils.ensureElement<HTMLElement>(
      '.card__text',
      container,
    );
    this._button = utils.ensureElement<HTMLButtonElement>(
      '.card__button',
      container,
    );
    this._image = utils.ensureElement<HTMLImageElement>(
      '.card__image',
      container,
    );
    this._category = utils.ensureElement<HTMLElement>(
      '.card__category',
      container,
    );
    if (clickHandler.onClick) {
      this._button.addEventListener('click', clickHandler.onClick);
    }
  }

  protected setDescription(description: string): void {
    this._description.textContent = description;
  }

  toggleButton(status: TProductStatus) {
    this._button.textContent = status === 'gallery' ? 'В корзину' : 'Удалить';
  }

  build(data: IProduct): this {
    super.build(data);
    this.setDescription(data.description);
    this.toggleButton(data.status);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
