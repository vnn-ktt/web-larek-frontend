import { IEventEmitter, IFormState } from '../../types/types';
import { Model } from '../base/Model';

export class FormState extends Model<IFormState> {
  valid: boolean;
  errors: string;

  constructor(data: Partial<IFormState>, eventEmitter: IEventEmitter) {
    super(data, eventEmitter);
    this.valid = false;
    this.errors = '';
  }

  getFormState(): IFormState {
    return {
      valid: this.valid,
      errors: this.errors,
    };
  }
}
