export abstract class View<T> {
  constructor(protected readonly container: HTMLElement) {}

  setTextContent(element: HTMLElement, value: unknown): void {
    if (element) {
      element.textContent = String(value);
    }
  }

  setImage(element: HTMLImageElement, src: string, alt?: string) {
    if (element) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }
  }

  getChild<T extends HTMLElement>(selector: string): T {
    const element = this.container.querySelector<T>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
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
