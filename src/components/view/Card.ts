import { IProduct } from '../../types/types';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class Card extends View<IProduct> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this._title = utils.ensureElement<HTMLElement>('.card__title', container);
    this._price = utils.ensureElement<HTMLElement>('.card__price', container);
  }

  get id(): string | undefined {
    return this.container.dataset.id || undefined;
  }

  get title(): string | undefined {
    return this._title.textContent || undefined;
  }

  get price(): string | undefined {
    return this._price.textContent || undefined;
  }

  protected setId(id: string): void {
    this.container.dataset.id = id;
  }

  protected setTitle(title: string): void {
    this._title.textContent = title;
  }

  protected setPrice(price: number): void {
    if (price !== null) {
      this._price.textContent = `${price} синапсов`;
    } else {
      this._price.textContent = 'Бесценно';
    }
  }

  build(data: IProduct): this {
    this.setId(data.id);
    this.setTitle(data.title);
    this.setPrice(data.price);
    return this;
  }

  render(data: IProduct): HTMLElement {
    return this.build(data).container;
  }
}
