import { IPage, IEventEmitter, EnEvents } from '../../types/types';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class Page extends View<IPage> implements IPage {
  protected _wrapper: HTMLElement;
  protected _gallery: HTMLElement;
  protected _cart: HTMLElement;
  protected _cartCounter: HTMLElement;
  protected _isLocked: boolean;

  constructor(container: HTMLElement, protected events: IEventEmitter) {
    super(container);

    this._wrapper = utils.ensureElement<HTMLElement>('.page__wrapper');
    this._gallery = utils.ensureElement<HTMLElement>('.gallery');
    this._cart = utils.ensureElement<HTMLElement>('.header__basket');
    this._cartCounter = utils.ensureElement<HTMLElement>(
      '.header__basket-counter',
    );

    this._cart.addEventListener('click', () => {
      this.events.emit(EnEvents.CartOpen);
    });
  }

  replaceGallery(items: HTMLElement[]): void {
    this._gallery.replaceChildren(...items);
  }

  replaceCartCounter(value: number): void {
    this.setTextContent(this._cartCounter, String(value));
  }

  togglePageLock(value: boolean): void {
    if (value) {
      this._isLocked = true;
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._isLocked = false;
      this._wrapper.classList.remove('page__wrapper_locked');
    }
  }
}
