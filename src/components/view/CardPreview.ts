import {
  IProduct,
  ICardPreview,
  IOnClick,
  TProductStatus,
  EnProductCategories,
} from '../../types/types';
import { CATEGORY_SELECTOR } from '../../utils/constants';
import { Card } from './Card';
import * as utils from '../../utils/utils';

export class CardPreview extends Card implements ICardPreview {
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, clickHandler?: IOnClick) {
    super(container);
    this._image = utils.ensureElement<HTMLImageElement>(
      '.card__image',
      container,
    );
    this._category = utils.ensureElement<HTMLElement>(
      '.card__category',
      container,
    );
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

  protected setCardImage(image: string, title: string): void {
    this.setImage(this._image, image, title);
  }

  protected setCategory(category: EnProductCategories): void {
    this._category.textContent = category;
    this._category.className = 'card__category';
    this._category.classList.add(CATEGORY_SELECTOR[category]);
  }

  protected setDescription(description: string): void {
    this._description.textContent = description;
  }

  protected build(data: IProduct): this {
    super.build(data);
    this.setCardImage(data.image, data.title);
    this.setCategory(data.category);
    this.setDescription(data.description);
    this.toggleButton(data.status);
    if (data.price === null) this.toggleDisabled(this._button, true);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
