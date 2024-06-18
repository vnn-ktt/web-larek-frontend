import {
  IProduct,
  EnProductCategories,
  TProductStatus,
} from '../../types/types';
import { Model } from '../base/Model';

export class Product extends Model<IProduct> implements IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: EnProductCategories;
  price: number | null;
  status: TProductStatus = 'gallery';
  index: string;
}
