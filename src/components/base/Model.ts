import { EnEvents, IEventEmitter } from '../../types/types';

export const isModel = (obj: unknown): obj is Model<unknown> => {
  return obj instanceof Model;
};

export abstract class Model<T> {
  constructor(data: Partial<T>, protected eventEmitter: IEventEmitter) {
    Object.assign(this, data);
  }

  emitChanges(event: EnEvents, payload?: object): void {
    this.eventEmitter.emit(event, payload ?? {});
  }
}
