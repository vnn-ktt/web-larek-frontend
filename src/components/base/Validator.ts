import { EnEvents, IEventEmitter } from '../../types/types';

export abstract class Validator<T> {
  protected errors: { [key: string]: string } = {};

  constructor(protected eventEmitter: IEventEmitter) {
    this.errors = {};
  }

  abstract validate(data: T): boolean;

  getErrors(): { [key: string]: string } {
    return this.errors;
  }

  isValid(data: T): boolean {
    this.errors = {};
    return this.validate(data);
  }

  protected emitChanges(event: EnEvents, payload?: object): void {
    this.eventEmitter.emit(event, payload ?? {});
  }
}
