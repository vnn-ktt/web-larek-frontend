import {
  TApiListResponse,
  IOrder,
  IProduct,
  ISuccessOrder,
  IWeblarekApi,
} from '../../types/types';
import { Api } from '../base/Api';

export class WeblarekApi extends Api implements IWeblarekApi {
  protected readonly _cdn: string;

  constructor(baseUrl: string, cdn: string) {
    super(baseUrl);
    this._cdn = cdn;
  }

  getProductList(): Promise<IProduct[]> {
    return this.get(`/product/`).then((data: TApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this._cdn + item.image,
      })),
    );
  }

  postOrder(order: IOrder): Promise<ISuccessOrder> {
    return this.post(`/order/`, order).then((data: ISuccessOrder) => data);
  }
}
