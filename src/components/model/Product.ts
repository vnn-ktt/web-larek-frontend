import {
  IProduct,
  IEventEmitter,
  EnProductCategories,
  TProductStatus,
} from '../../types/types';
import { Model } from '../base/Model';

export class Product extends Model<IProduct> {
  protected _data: IProduct;

  constructor(data: Partial<IProduct>, eventEmitter: IEventEmitter) {
    super(data, eventEmitter);
    this._data.status = 'gallery';
  }

  get id(): string {
    return this._data.id;
  }

  get title(): string {
    return this._data.title;
  }

  get description(): string {
    return this._data.description;
  }

  get price(): number {
    return this._data.price;
  }

  get image(): string {
    return this._data.image;
  }

  get category(): EnProductCategories {
    return this._data.category;
  }

  get status(): TProductStatus {
    return this._data.status;
  }

  replaceStatus(status: TProductStatus): void {
    if (status == 'basket') {
      this._data.status = 'basket';
    } else {
      this._data.status = 'gallery';
    }
  }
}
