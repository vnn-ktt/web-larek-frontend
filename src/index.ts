/* Styles */
import './scss/styles.scss';
/* Utils */
import * as utils from './utils/utils';
/* Presenter */
import { EventEmitter } from './components/base/EventEmitter';
/* Model */
import { Product } from './components/model/Product';
import { Catalog } from './components/model/Catalog';
/* View */
import { Card } from './components/view/Card';
import { Page } from './components/view/Page';
/* Constants */
import { API_URL, CDN_URL } from './utils/constants';
/* Types */
import { EnEvents, IProduct, ICardAction } from './types/types';
/* Api */
import { WeblarekApi } from './components/presenter/WeblarekApi';
import { CardPreview } from './components/view/CardPreview';

//Получаем шаблоны компонентов
const cardCatalogTemplate =
  utils.ensureElement<HTMLTemplateElement>('#card-catalog');
// const cardPreviewTemplate =
//   utils.ensureElement<HTMLTemplateElement>('#card-preview');
// const cardBasketTemplate =
//   utils.ensureElement<HTMLTemplateElement>('#card-basket');
// const basketTemplate = utils.ensureElement<HTMLTemplateElement>('#basket');
// const contactsTemplate = utils.ensureElement<HTMLTemplateElement>('#contacts');
// const orderTemplate = utils.ensureElement<HTMLTemplateElement>('#order');
// const successTemplate = utils.ensureElement<HTMLTemplateElement>('#success');

//Инициализация объектов
const eventEmitter = new EventEmitter();
const weblarekApi = new WeblarekApi(API_URL, CDN_URL);
const catalog = new Catalog({ products: [] }, eventEmitter);
const page = new Page(document.body, eventEmitter);

// Получение данных о продуктах с сервера
weblarekApi
  .getProductList()
  .then((productList: IProduct[]) => {
    catalog.addProducts(productList);
  })
  .catch((error) => {
    console.error('#Error fetching with WeblarekApi# ', error);
  });

// Выводим каталог товаров на главную страницу
eventEmitter.on(EnEvents.CatalogAssembled, () => {
  const gallery = catalog.getAllProducts().map((item) => {
    const container = utils.cloneTemplate(cardCatalogTemplate);
    try {
      const card = new CardPreview(container, item, {
        onClick: () => eventEmitter.emit(EnEvents.CardSelect, item),
      });
      return card.render();
    } catch (error) {
      console.error('#Error creating or rendering CardPreview#:', error);
      return null;
    }
  });
  page.replaceGallery(gallery);
});

//Блокируем страницу при открытии модальных окон
eventEmitter.on(EnEvents.ModalOpen, () => {
  page.togglePageLock(true);
});

//Разблокируем страницу при закрытии модальных окон
eventEmitter.on(EnEvents.ModalClose, () => {
  page.togglePageLock(false);
});
