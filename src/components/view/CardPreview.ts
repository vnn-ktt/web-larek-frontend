import { ICard, ICardAction, IProduct } from '../../types/types';
import { CATEGORY_SELECTOR } from '../../utils/constants';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class CardPreview extends View<ICard> {
  protected _data: IProduct;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement, data: IProduct, actions: ICardAction) {
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
    this._data = data;
    container.addEventListener('click', actions.onClick);
  }

  get id(): string | undefined {
    return this.container.dataset.id || undefined;
  }

  get title(): string | undefined {
    return this._title.textContent || undefined;
  }

  private setId(): void {
    this.container.dataset.id = this._data.id;
  }

  private setTitle(): void {
    this._title.textContent = this._data.title;
  }

  private setCardImage(): void {
    this.setImage(this._image, this._data.image, this._data.title);
  }

  private setCategory(): void {
    this._category.textContent = this._data.category;
    this._category.className = 'card__category';
    this._category.classList.add(CATEGORY_SELECTOR[this._data.category]);
  }

  private setPrice(): void {
    if (this._data.price !== null) {
      this._price.textContent = `${this._data.price} синапсов`;
    } else {
      this._price.textContent = 'Бесценно';
    }
  }

  build(): this {
    this.setId();
    this.setTitle();
    this.setCardImage();
    this.setCategory();
    this.setPrice();
    return this;
  }

  render(): HTMLElement {
    return this.build().container;
  }
}
