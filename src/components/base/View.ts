import { IView } from '../../types/types';

export abstract class View<T> implements IView<T> {
  constructor(protected readonly container: HTMLElement) {}

  setText(element: HTMLElement, value: unknown): void {
    if (element) {
      element.textContent = String(value);
    }
  }

  toggleClass(element: HTMLElement, className: string, force?: boolean): void {
    if (element) {
      element.classList.toggle(className, force);
    }
  }

  toggleDisabled(element: HTMLElement, state: boolean): void {
    if (element) {
      if (state) element.setAttribute('disabled', 'disabled');
      else element.removeAttribute('disabled');
    }
  }

  toggleHidden(element: HTMLElement): void {
    if (element) {
      if (element.style.display == 'none') {
        element.style.removeProperty('display');
      } else {
        element.style.display = 'none';
      }
    }
  }

  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
