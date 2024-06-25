import { IPurchase, IOrderResult, IOnClick } from '../../types/types';
import { View } from '../base/View';
import * as utils from '../../utils/utils';

export class Purchase extends View<IPurchase> {
  protected _buttonSubmit: HTMLButtonElement;
  protected _total: HTMLElement;

  constructor(container: HTMLElement, handler: IOnClick) {
    super(container);
    this._buttonSubmit = utils.ensureElement<HTMLButtonElement>(
      '.order-success__close',
      this.container,
    );
    this._total = utils.ensureElement<HTMLElement>(
      '.order-success__description',
      this.container,
    );
    if (handler?.onClick) {
      this._buttonSubmit.addEventListener('click', handler.onClick);
    }
  }

  private setTotal(value: number): void {
    this.setTextContent(this._total, `Списано ${value} синапсов`);
  }

  private build(data: IOrderResult): this {
    this.setTotal(data.total);
    return this;
  }

  render(data: IOrderResult): HTMLElement {
    return this.build(data).container;
  }
}
