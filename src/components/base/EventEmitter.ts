import {
  TEventName,
  TEventEmitter,
  TSubscriber,
  IEventEmitter,
} from '../../types/types';

export class EventEmitter implements IEventEmitter {
  _events: Map<TEventName, Set<TSubscriber>>;

  constructor() {
    this._events = new Map<TEventName, Set<TSubscriber>>();
  }

  on<T extends object>(eventName: TEventName, callback: (event: T) => void) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<TSubscriber>());
    }
    this._events.get(eventName)?.add(callback);
  }

  off(eventName: TEventName, callback: TSubscriber) {
    if (this._events.has(eventName)) {
      this._events.get(eventName)?.delete(callback);
      if (this._events.get(eventName)?.size === 0) {
        this._events.delete(eventName);
      }
    }
  }

  emit<T extends object>(eventName: string, data?: T) {
    this._events.forEach((subscribers, name) => {
      if (
        (name instanceof RegExp && name.test(eventName)) ||
        name === eventName
      ) {
        subscribers.forEach((callback) => callback(data));
      }
    });
  }

  onAll(callback: (event: TEventEmitter) => void) {
    this.on('*', callback);
  }

  offAll() {
    this._events = new Map<string, Set<TSubscriber>>();
  }

  trigger<T extends object>(eventName: string, context?: Partial<T>) {
    return (event: object = {}) => {
      this.emit(eventName, {
        ...(event || {}),
        ...(context || {}),
      });
    };
  }
}
