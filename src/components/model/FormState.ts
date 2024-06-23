import { IFormState } from '../../types/types';
import { Model } from '../base/Model';

export class FormState extends Model<IFormState> {
  valid: boolean;
  errors: string[] = [];

  getFormState(): IFormState {
    return {
      valid: this.valid,
      errors: this.errors,
    };
  }
}
