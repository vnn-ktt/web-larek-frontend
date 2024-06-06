import {
  EnProductCategories,
  EnEvents,
  IProduct,
  IEventEmitter,
} from '../types/types';
import { Model } from './base/Model';

export class Product extends Model<IProduct> implements IProduct {
  id: string;
  title: string;
  description: string;
  price: number | null;
  image: string;
  category: EnProductCategories;

  constructor(data: Partial<IProduct>, eventEmitter: IEventEmitter) {
    super(data, eventEmitter);
    this.id = data.id ?? '';
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.price = data.price ?? null;
    this.image = data.image ?? '';
    this.category = data.category ?? undefined;
  }

  setData(data: Partial<IProduct>): void {
    Object.assign(this, data);
    this.emitChanges(EnEvents.ProductChange, { data: this.getData() });
  }

  getData(): Partial<IProduct> | null {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.image,
      category: this.category,
    };
  }

  updateData(updatedData: Partial<IProduct>): void {
    Object.assign(this, updatedData);
    this.emitChanges(EnEvents.ProductChange, { data: this.getData() });
  }

  clearData(): void {
    this.id = '';
    this.title = '';
    this.description = '';
    this.price = null;
    this.image = '';
    this.category = undefined;
    this.emitChanges(EnEvents.ProductChange, { data: this.getData() });
  }
}
