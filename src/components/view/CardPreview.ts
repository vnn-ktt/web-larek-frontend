import {
  IProduct,
  ICardPreview,
  IOnClick,
  TProductStatus,
} from '../../types/types';
import { CardCatalog } from './CardCatalog';
import * as utils from '../../utils/utils';

export class CardPreview extends CardCatalog implements ICardPreview {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, clickHandler?: IOnClick) {
    super(container);
    this._description = utils.ensureElement<HTMLElement>(
      '.card__text',
      container,
    );
    this._button = utils.ensureElement<HTMLButtonElement>(
      '.card__button',
      container,
    );
    if (clickHandler.onClick) {
      this._button.addEventListener('click', clickHandler.onClick);
    }
  }

  toggleButton(status: TProductStatus): void {
    this._button.textContent = status === 'gallery' ? 'В корзину' : 'Удалить';
  }

  protected setDescription(description: string): void {
    this._description.textContent = description;
  }

  protected build(data: IProduct): this {
    super.build(data);
    this.setDescription(data.description);
    this.toggleButton(data.status);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
