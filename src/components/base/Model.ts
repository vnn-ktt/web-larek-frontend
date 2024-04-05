import { IEventEmitter } from './EventEmitter';
import { EventType } from '../../types/types.ts';

export abstract class Model<T> {
  protected _data: Partial<T> | null;
  protected _events: IEventEmitter;

  constructor(data: Partial<T>, events: IEventEmitter) {
    this._data = data;
    this._events = events;
  }

  setData(data: Partial<T>): void {
    this._data = data;
  }

  getData(): Partial<T> | null {
    return this._data;
  }

  updateData(updatedData: Partial<T>): void {
    this._data = { ...this._data, ...updatedData };
  }

  clearData(): void {
    this._data = null;
  }

  protected _changed(): void {
    this._events.emit(EventType.ModelChange, { data: this._data });
  }
}
