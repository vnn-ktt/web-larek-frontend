/* Styles */
import './scss/styles.scss';
/* Utils */
import * as utils from './utils/utils';
/* Presenter */
import { EventEmitter } from './components/base/EventEmitter';
/* Model */
import { Catalog } from './components/model/Catalog';
/* View */
import { Modal } from './components/view/Modal';
import { Card } from './components/view/Card';
import { CardPreview } from './components/view/CardPreview';
import { Page } from './components/view/Page';
/* Constants */
import { API_URL, WEBLAREK_URL } from './utils/constants';
/* Types */
import { EnEvents, IProduct } from './types/types';
/* Api */
import { WeblarekApi } from './components/WeblarekApi';

//Получаем шаблоны компонентов
const cardCatalogTemplate =
  utils.ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate =
  utils.ensureElement<HTMLTemplateElement>('#card-preview');
// const cardBasketTemplate =
//   utils.ensureElement<HTMLTemplateElement>('#card-basket');
// const basketTemplate = utils.ensureElement<HTMLTemplateElement>('#basket');
// const contactsTemplate = utils.ensureElement<HTMLTemplateElement>('#contacts');
// const orderTemplate = utils.ensureElement<HTMLTemplateElement>('#order');
// const successTemplate = utils.ensureElement<HTMLTemplateElement>('#success');

//Инициализация объектов
const eventEmitter = new EventEmitter();
const weblarekApi = new WeblarekApi(API_URL, WEBLAREK_URL);
const catalog = new Catalog({ products: [] }, eventEmitter);
const page = new Page(document.body, eventEmitter);
const modal = new Modal(
  utils.ensureElement<HTMLElement>('#modal-container'),
  eventEmitter,
);

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
  const gallery = catalog.getAllProducts().map((product) => {
    const container = utils.cloneTemplate(cardCatalogTemplate);
    try {
      const card = new Card(container, {
        onClick: () => eventEmitter.emit(EnEvents.CardSelect, product),
      });
      return card.render(product);
    } catch (error) {
      console.error('#Error creating or rendering CardPreview#:', error);
      return null;
    }
  });
  page.replaceGallery(gallery);
});

// При открытии карточки товара
eventEmitter.on(EnEvents.CardSelect, (product: IProduct) => {
  try {
    const container = utils.cloneTemplate(cardPreviewTemplate);
    const cardPreview = new CardPreview(container);
    modal.replaceContent(cardPreview.render(product));
    modal.open();
  } catch (error) {
    console.error('#Error with Modal or CardPreview#:', error);
  }
});

//Блокируем страницу при открытии модальных окон
eventEmitter.on(EnEvents.ModalOpen, () => {
  page.togglePageLock(true);
});

//Разблокируем страницу при закрытии модальных окон
eventEmitter.on(EnEvents.ModalClose, () => {
  page.togglePageLock(false);
});
