import { IApi, TApiPostMethods } from '../../types/types';

export class Api implements IApi {
  readonly baseUrl: string;
  protected _options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this._options = {
      headers: {
        'Content-Type': 'application/json',
        ...((options.headers as object) ?? {}),
      },
    };
  }

  protected _handleResponse(response: Response): Promise<object> {
    if (response.ok) return response.json();
    else
      return response
        .json()
        .then((data) => Promise.reject(data.error ?? response.statusText));
  }

  get(uri: string): Promise<unknown> {
    return fetch(this.baseUrl + uri, {
      ...this._options,
      method: 'GET',
    }).then(this._handleResponse);
  }

  post(
    uri: string,
    data: object,
    method: TApiPostMethods = 'POST',
  ): Promise<unknown> {
    return fetch(this.baseUrl + uri, {
      ...this._options,
      method,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }
}
