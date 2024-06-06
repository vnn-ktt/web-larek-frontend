import { EnEvents, IEventEmitter } from '../../types/types';

export const isModel = (obj: unknown): obj is Model<unknown> => {
  return obj instanceof Model;
};

export abstract class Model<T> {
  constructor(
    protected data: Partial<T>,
    protected eventEmitter: IEventEmitter,
  ) {}

  setData?(data: Partial<T>): void {
    Object.assign(this.data, data);
    this.emitChanges(EnEvents.ModelChange, this.data);
  }

  getData?(): Partial<T> | null {
    return this.data ? { ...this.data } : null;
  }

  updateData?(updatedData: Partial<T>): void {
    Object.assign(this.data, updatedData);
    this.emitChanges(EnEvents.ModelChange, this.data);
  }

  clearData?(): void {
    this.data = {} as Partial<T>;
    this.emitChanges(EnEvents.ModelChange, this.data);
  }

  emitChanges(event: string, payload?: object): void {
    this.eventEmitter.emit(event, payload ?? {});
  }
}
