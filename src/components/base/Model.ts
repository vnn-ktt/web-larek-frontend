import { EnEvents, IEventEmitter } from '../../types/types';

export const isModel = (obj: unknown): obj is Model<unknown> => {
  return obj instanceof Model;
};

export abstract class Model<T> {
  constructor(
    protected _data: Partial<T>,
    protected _eventEmitter: IEventEmitter,
  ) {}

  setData(data: Partial<T>): void {
    Object.assign(this._data, data);
    this.emitChanges(EnEvents.ModelChange, this._data);
  }

  getData(): Partial<T> | null {
    return this._data ? { ...this._data } : null;
  }

  updateData(updatedData: Partial<T>): void {
    Object.assign(this._data, updatedData);
    this.emitChanges(EnEvents.ModelChange, this._data);
  }

  clearData(): void {
    this._data = {} as Partial<T>;
    this.emitChanges(EnEvents.ModelChange, this._data);
  }

  emitChanges(event: string, payload?: object): void {
    this._eventEmitter.emit(event, payload ?? {});
  }
}
