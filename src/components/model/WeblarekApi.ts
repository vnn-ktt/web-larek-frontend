import {
  TApiListResponse,
  IOrder,
  IOrderResult,
  IProduct,
  IWeblarekApi,
} from '../../types/types';
import { Api } from '../base/api';

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

  postOrder(order: IOrder): Promise<IOrderResult> {
    return this.post(`/order/`, order).then((data: IOrderResult) => data);
  }
}
