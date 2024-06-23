/* Styles */
import './scss/styles.scss';
/* Utils */
import * as utils from './utils/utils';
/* Presenter */
import { EventEmitter } from './components/base/EventEmitter';
/* Model */
import { Catalog } from './components/model/Catalog';
import { Basket } from './components/model/Basket';
import { Order } from './components/model/Order';
import { FormState } from './components/model/FormState';
/* View */
import { Modal } from './components/view/Modal';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { Cart } from './components/view/Сart';
import { Page } from './components/view/Page';
import { FormPayment } from './components/view/FormPayment';
/* Constants */
import { API_URL, WEBLAREK_URL } from './utils/constants';
/* Types */
import {
  EnEvents,
  IContacts,
  IPayment,
  IProduct,
  TPaymentMethods,
} from './types/types';
/* Api */
import { WeblarekApi } from './components/model/WeblarekApi';
import { ValidatorPayment } from './components/model/ValidatorPayment';
import { Form } from './components/view/Form';

//Получаем шаблоны компонентов
const cardCatalogTemplate =
  utils.ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate =
  utils.ensureElement<HTMLTemplateElement>('#card-preview');
const cardCartTemplate =
  utils.ensureElement<HTMLTemplateElement>('#card-basket');
const cartTemplate = utils.ensureElement<HTMLTemplateElement>('#basket');
const paymentTemplate = utils.ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = utils.ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = utils.ensureElement<HTMLTemplateElement>('#success');

//Инициализация объектов
const eventEmitter = new EventEmitter();
const weblarekApi = new WeblarekApi(API_URL, WEBLAREK_URL);
const catalog = new Catalog([], eventEmitter);
const basket = new Basket([], eventEmitter);
const order = new Order({ paymentMethod: 'online', address: '' }, eventEmitter);
const page = new Page(document.body, eventEmitter);
const modal = new Modal(
  utils.ensureElement<HTMLElement>('#modal-container'),
  eventEmitter,
);
const cart = new Cart(utils.cloneTemplate(cartTemplate), eventEmitter);
const formState = new FormState({}, eventEmitter);
const formPayment = new FormPayment(
  utils.cloneTemplate(paymentTemplate),
  eventEmitter,
);
const validatorPayment = new ValidatorPayment(eventEmitter);

// Получение данных о продуктах с сервера
weblarekApi
  .getProductList()
  .then((productList: IProduct[]) => {
    catalog.assembleCatalog(productList);
  })
  .catch((error) => {
    console.error('#Ошибка с запросом к WeblarekApi# ', error);
  });

// Выводим каталог товаров на главную страницу
eventEmitter.on(EnEvents.CatalogAssemble, () => {
  const gallery = catalog.getAllProducts().map((product) => {
    const container = utils.cloneTemplate(cardCatalogTemplate);
    try {
      const card = new CardCatalog(container, {
        onClick: () => eventEmitter.emit(EnEvents.CardOpen, product),
      });
      return card.render(product);
    } catch (error) {
      console.error('#Ошибка с созданием/рендером CardPreview#:', error);
      return null;
    }
  });
  page.replaceGallery(gallery);
});

// При открытии карточки товара
eventEmitter.on(EnEvents.CardOpen, (product: IProduct) => {
  try {
    const container = utils.cloneTemplate(cardPreviewTemplate);
    const cardPreview = new CardPreview(container, {
      onClick: (event) => {
        event.stopPropagation();
        eventEmitter.emit(EnEvents.ProductToggle, product);
        cardPreview.toggleButton(product.status);
      },
    });
    modal.replaceContent(cardPreview.render(product));
    modal.open();
  } catch (error) {
    console.error('#Ошибка с открытием CardPreview#:', error);
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

//Добавляем продукт в корзину, удаляем продукт из корзины при закрытой корзине
eventEmitter.on(EnEvents.ProductToggle, (product) => {
  try {
    basket.toggleProduct(product as IProduct);
    page.replaceCartCounter(basket.products.length);
  } catch (error) {
    console.error('#Ошибка с добавлением (удалением) Basket#:', error);
  }
});

//Добавляем продукт в корзину, удаляем продукт из корзины при открытой корзине
eventEmitter.on(EnEvents.CartChange, (product) => {
  try {
    basket.toggleProduct(product as IProduct);
    page.replaceCartCounter(basket.products.length);
    cart.refreshCart(
      basket.getAllProducts(),
      basket.getTotalCost(),
      cardCartTemplate,
    );
    modal.replaceContent(cart.render());
  } catch (error) {
    console.error('#Ошибка с добавлением (удалением) Basket/Cart#:', error);
  }
});

//Открываем корзину
eventEmitter.on(EnEvents.CartOpen, () => {
  try {
    cart.refreshCart(
      basket.getAllProducts(),
      basket.getTotalCost(),
      cardCartTemplate,
    );
    modal.replaceContent(cart.render());
    modal.open();
  } catch (error) {
    console.error('#Ошибка с открытием Cart#:', error);
  }
});

//Открылось модальное окно выбора способа оплаты
eventEmitter.on(EnEvents.OrderCreate, () => {
  order.total = basket.getTotalCost();
  const renderData = Object.assign(
    {},
    order.getPaymentData(),
    formState.getFormState(),
  );
  modal.replaceContent(formPayment.render(renderData));
  modal.open();
});

//Обработка изменения кнопки оплаты
eventEmitter.on(
  EnEvents.PaymentButtonChange,
  (data: { value: TPaymentMethods }) => {
    order.paymentMethod = data.value;
  },
);

//Обработка ввода адреса
eventEmitter.on(
  EnEvents.PaymentAddressChange,
  (data: { input: keyof IPayment; value: string }) => {
    order.address = data.value;
    if (validatorPayment.validate(order)) {
      formState.valid = true;
      formPayment.setFormState(formState.getFormState());
    } else {
      formState.valid = false;
      formPayment.setFormState(formState.getFormState());
    }
  },
);

//Обработка ошибок формы выбора способа оплаты
eventEmitter.on(EnEvents.PaymentErrors, (errors: IPayment) => {
  formState.errors = Object.values(errors).filter(
    (value) => typeof value === 'string',
  );
});
