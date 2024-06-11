import { ICardAction, IProduct } from '../../types/types';
import { CardPreview } from './CardPreview';
import * as utils from '../../utils/utils';

export class Card extends CardPreview {
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;
  protected _index: HTMLElement;

  constructor(container: HTMLElement, data: IProduct, actions: ICardAction) {
    super(container, data, actions);
    this._description = utils.ensureElement<HTMLElement>(
      '.card__text',
      container,
    );
    this._button = utils.ensureElement<HTMLButtonElement>(
      '.card__button',
      container,
    );
    this._index = utils.ensureElement<HTMLElement>(
      '.basket__item-index',
      container,
    );
  }

  get index(): string | undefined {
    return this._index.textContent || undefined;
  }

  set index(value: string) {
    this.setTextContent(this._index, value);
  }

  private setDescription(): void {
    this._description.textContent = this._data.description;
  }

  private setButton(): void {
    this._button.textContent =
      this._data.status === 'gallery' ? 'В корзину' : 'Удалить';
  }

  build(): this {
    super.build();
    this.setDescription();
    this.setButton();
    return this;
  }

  render(): HTMLElement {
    return this.build().container;
  }
}
