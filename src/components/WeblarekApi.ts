import {
  TApiListResponse,
  IOrder,
  IProduct,
  ISuccessOrder,
  IWeblarekApi,
} from '../types/types';
import { Api } from './base/Api';

export class WeblarekApi extends Api implements IWeblarekApi {
  protected readonly _weblarek_url: string;

  constructor(baseUrl: string, weblarek_url: string) {
    super(baseUrl);
    this._weblarek_url = weblarek_url;
  }

  getProductList(): Promise<IProduct[]> {
    return this.get(`/product/`).then((data: TApiListResponse<IProduct>) =>
      data.items.map((item) => ({
        ...item,
        image: this._weblarek_url + item.image,
      })),
    );
  }

  postOrder(order: IOrder): Promise<ISuccessOrder> {
    return this.post(`/order/`, order).then((data: ISuccessOrder) => data);
  }
}
