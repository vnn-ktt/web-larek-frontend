import { View } from '../base/View';
import { EnEvents, IEventEmitter, IModal } from '../../types/types';
import * as utils from '../../utils/utils';

export class Modal extends View<IModal> implements IModal {
  protected _buttonClose: HTMLButtonElement;
  protected _content: HTMLElement;
  protected _isOpened: boolean;

  constructor(container: HTMLElement, protected events: IEventEmitter) {
    super(container);

    this._buttonClose = utils.ensureElement<HTMLButtonElement>(
      '.modal__close',
      container,
    );
    this._content = utils.ensureElement<HTMLElement>(
      '.modal__content',
      container,
    );
    this.container.addEventListener('click', this.close.bind(this));
    this._buttonClose.addEventListener('click', this.close.bind(this));
    this._content.addEventListener('click', (event) => event.stopPropagation());
  }

  replaceContent(content: HTMLElement): void {
    this._content.replaceChildren(content);
  }

  toggleIsOpened(value: boolean): void {
    if (value) this._isOpened = true;
    else this._isOpened = false;
  }

  open(): void {
    this.container.classList.add('modal_active');
    this.toggleIsOpened(true);
    this.events.emit(EnEvents.ModalOpen);
  }

  close(): void {
    this.container.classList.remove('modal_active');
    this.toggleIsOpened(false);
    this.events.emit(EnEvents.ModalClose);
  }
}
