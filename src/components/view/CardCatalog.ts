import {
  EnProductCategories,
  ICardClickHandler,
  IProduct,
} from '../../types/types';
import { CATEGORY_SELECTOR } from '../../utils/constants';
import { Card } from './Card';
import * as utils from '../../utils/utils';

export class CardCatalog extends Card {
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;

  constructor(container: HTMLElement, clickHandler?: ICardClickHandler) {
    super(container);
    this._image = utils.ensureElement<HTMLImageElement>(
      '.card__image',
      container,
    );
    this._category = utils.ensureElement<HTMLElement>(
      '.card__category',
      container,
    );
    if (clickHandler) {
      container.addEventListener('click', clickHandler.onClick);
    }
  }

  get imagePath(): string | undefined {
    return this._image.src || undefined;
  }

  get category(): string | undefined {
    return this._category.textContent || undefined;
  }

  protected setCardImage(image: string, title: string): void {
    this.setImage(this._image, image, title);
  }

  protected setCategory(category: EnProductCategories): void {
    this._category.textContent = category;
    this._category.className = 'card__category';
    this._category.classList.add(CATEGORY_SELECTOR[category]);
  }

  build(data: IProduct): this {
    super.build(data);
    this.setCardImage(data.image, data.title);
    this.setCategory(data.category);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
