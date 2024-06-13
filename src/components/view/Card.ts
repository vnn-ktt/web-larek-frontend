import {
  EnProductCategories,
  ICardClickHandler,
  IProduct,
  ICard,
} from '../../types/types';
import { CATEGORY_SELECTOR } from '../../utils/constants';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class Card extends View<IProduct> implements ICard {
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement, clickHandler?: ICardClickHandler) {
    super(container);
    this._title = utils.ensureElement<HTMLElement>('.card__title', container);
    this._image = utils.ensureElement<HTMLImageElement>(
      '.card__image',
      container,
    );
    this._category = utils.ensureElement<HTMLElement>(
      '.card__category',
      container,
    );
    this._price = utils.ensureElement<HTMLElement>('.card__price', container);
    if (clickHandler) {
      container.addEventListener('click', clickHandler.onClick);
    }
  }

  get id(): string | undefined {
    return this.container.dataset.id || undefined;
  }

  get title(): string | undefined {
    return this._title.textContent || undefined;
  }

  get imagePath(): string | undefined {
    return this._image.src || undefined;
  }

  get category(): string | undefined {
    return this._category.textContent || undefined;
  }

  get price(): string | undefined {
    return this._price.textContent || undefined;
  }

  private setId(id: string): void {
    this.container.dataset.id = id;
  }

  private setTitle(title: string): void {
    this._title.textContent = title;
  }

  private setCardImage(image: string, title: string): void {
    this.setImage(this._image, image, title);
  }

  private setCategory(category: EnProductCategories): void {
    this._category.textContent = category;
    this._category.className = 'card__category';
    this._category.classList.add(CATEGORY_SELECTOR[category]);
  }

  private setPrice(price: number): void {
    if (price !== null) {
      this._price.textContent = `${price} синапсов`;
    } else {
      this._price.textContent = 'Бесценно';
    }
  }

  build(data: IProduct): this {
    this.setId(data.id);
    this.setTitle(data.title);
    this.setCardImage(data.image, data.title);
    this.setCategory(data.category);
    this.setPrice(data.price);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
