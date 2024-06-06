/* Styles */
import './scss/styles.scss';
/* Utils */
import * as utils from './utils/utils';
/* Base */
import { EventEmitter } from './components/base/EventEmitter';
/* Model */
import { Product } from './components/Product';
import { Catalog } from './components/Catalog';
/* Constants */
import { API_URL, CDN_URL } from './utils/constants';
/* Types */
import { EnEvents } from './types/types';
import { IProduct } from './types/types';

import { WeblarekApi } from './components/WeblarekApi';

//Инициализируем weblarekApi
const weblarekApi = new WeblarekApi(API_URL, CDN_URL);

// Инициализация eventEmitter
const eventEmitter = new EventEmitter();

// Инициализация каталога
const catalog = new Catalog(eventEmitter);
// Получение данных о продуктах с сервера
weblarekApi
  .getProductList()
  .then((productList: IProduct[]) => {
    productList.forEach((productData) => catalog.addProduct(productData));
    console.log(catalog.getAllProducts());
  })
  .catch((error) => {
    console.error('ERROR FETCHING:', error);
  });
