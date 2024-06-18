export abstract class Validator<T> {
  protected errors: { [key: string]: string } = {};

  constructor() {
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
}
