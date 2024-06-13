// import { IProduct, ICardClickHandler, TProductStatus } from '../../types/types';
// import { Card } from './Card';
// import * as utils from '../../utils/utils';

// export class CardPreview extends Card {
//   protected _index: HTMLElement;

//   constructor(container: HTMLElement, clickHandler?: ICardClickHandler) {
//     super(container, clickHandler);
//     this._index = utils.ensureElement<HTMLElement>(
//       '.basket__item-index',
//       container,
//     );
//   }

//   get index(): string | undefined {
//     return this._index.textContent || undefined;
//   }

//   set index(value: string) {
//     this.setTextContent(this._index, value);
//   }

//   private setIndex(index: string): void {
//     this.setTextContent(this._index, value);
//   }

//   private setButton(status: TProductStatus): void {
//     this._button.textContent = status === 'gallery' ? 'В корзину' : 'Удалить';
//   }

//   build(data: IProduct): this {
//     super.build(data);
//     this.setIndex(data.description);
//     return this;
//   }

//   render(data: IProduct,): HTMLElement {
//     return this.build(data).container;
//   }
// }
