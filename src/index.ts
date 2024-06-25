/* Styles */
import './scss/styles.scss';
/* Utils */
import * as utils from './utils/utils';
/* Events */
import { EventEmitter } from './components/base/EventEmitter';
/* Model */
import { Catalog } from './components/model/Catalog';
import { Basket } from './components/model/Basket';
import { Order } from './components/model/Order';
import { FormState } from './components/model/FormState';
import { ValidatorPayment } from './components/model/ValidatorPayment';
import { ValidatorContacts } from './components/model/ValidatorContacts';
/* View */
import { Modal } from './components/view/Modal';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { Cart } from './components/view/Сart';
import { Page } from './components/view/Page';
import { FormPayment } from './components/view/FormPayment';
import { FormContacts } from './components/view/FormContacts';
import { Purchase } from './components/view/Purchase';
/* Constants */
import { API_URL, WEBLAREK_URL } from './utils/constants';
/* Types */
import {
  EnEvents,
  IContacts,
  IOrderResult,
  IPayment,
  IProduct,
  TPaymentMethods,
} from './types/types';
/* Api */
import { WeblarekApi } from './components/model/WeblarekApi';

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
const purchaseTemplate = utils.ensureElement<HTMLTemplateElement>('#success');

//Инициализируем объекты
const eventEmitter = new EventEmitter();
const weblarekApi = new WeblarekApi(API_URL, WEBLAREK_URL);
const catalog = new Catalog([], eventEmitter);
const basket = new Basket([], eventEmitter);
const order = new Order({ payment: 'online', address: '' }, eventEmitter);
const formState = new FormState({}, eventEmitter);
const validatorPayment = new ValidatorPayment(eventEmitter);
const validatorContacts = new ValidatorContacts(eventEmitter);
const page = new Page(document.body, eventEmitter);
const modal = new Modal(
  utils.ensureElement<HTMLElement>('#modal-container'),
  eventEmitter,
);
const cart = new Cart(utils.cloneTemplate(cartTemplate), eventEmitter);
const formPayment = new FormPayment(
  utils.cloneTemplate(paymentTemplate),
  eventEmitter,
);
const formContacts = new FormContacts(
  utils.cloneTemplate(contactsTemplate),
  eventEmitter,
);
const purchase = new Purchase(utils.cloneTemplate(purchaseTemplate), {
  onClick: () => modal.close(),
});

// Получаем данные с сервера
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
      console.error('#Ошибка с созданием/рендером CardPreview# ', error);
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

// Рендерим CardPreview
eventEmitter.on(EnEvents.CardOpen, (product: IProduct) => {
  try {
    const container = utils.cloneTemplate(cardPreviewTemplate);
    const cardPreview = new CardPreview(container, {
      onClick: (event: Event) => {
        event.stopPropagation();
        eventEmitter.emit(EnEvents.ProductToggle, product);
        cardPreview.toggleButton(product.status);
      },
    });
    modal.replaceContent(cardPreview.render(product));
    modal.open();
  } catch (error) {
    console.error('#Ошибка с открытием CardPreview# ', error);
  }
});

//Добавляем продукт в корзину, удаляем продукт из корзины при закрытой корзине
eventEmitter.on(EnEvents.ProductToggle, (product) => {
  try {
    basket.toggleProduct(product as IProduct);
    page.replaceCartCounter(basket.getProductsAmount());
  } catch (error) {
    console.error('#Ошибка с добавлением (удалением) Basket# ', error);
  }
});

//Добавляем продукт в корзину, удаляем продукт из корзины при открытой корзине
eventEmitter.on(EnEvents.CartChange, (product) => {
  try {
    basket.toggleProduct(product as IProduct);
    page.replaceCartCounter(basket.getProductsAmount());
    cart.refreshCart(
      basket.getAllProducts(),
      basket.getTotalCost(),
      cardCartTemplate,
    );
    modal.replaceContent(cart.render());
  } catch (error) {
    console.error('#Ошибка с добавлением (удалением) Basket/Cart# ', error);
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
    console.error('#Ошибка с открытием Cart# ', error);
  }
});

//Создаем заказ
eventEmitter.on(EnEvents.OrderCreate, () => {
  order.total = basket.getTotalCost();
  const { payment: TPaymentMethod, address: addressString } = order;
  formState.valid = validatorPayment.isValid({
    payment: TPaymentMethod,
    address: addressString,
  });
  try {
    const renderData = Object.assign(
      {},
      order.getPaymentData(),
      formState.getFormState(),
    );
    modal.replaceContent(formPayment.render(renderData));
    modal.open();
  } catch (error) {
    console.error(
      '#Ошибка с формированием окна выбора способа оплаты# ',
      error,
    );
  }
});

//Обрабатываем изменения кнопки оплаты
eventEmitter.on(
  EnEvents.PaymentButtonChange,
  (data: { value: TPaymentMethods }) => {
    order.payment = data.value;
  },
);

//Обрабатываем ввод адреса (address)
eventEmitter.on(
  EnEvents.PaymentAddressChange,
  (data: { input: keyof IPayment; value: string }) => {
    order.address = data.value;
    try {
      if (validatorPayment.isValid(order)) {
        formState.valid = true;
      } else {
        formState.valid = false;
      }
      formPayment.setFormState(formState.getFormState());
    } catch (error) {
      console.error(
        '#Ошибка с валидированием формы выбора оплаты (address)# ',
        error,
      );
    }
  },
);

//Обрабатываем ошибки формы выбора способа оплаты
eventEmitter.on(EnEvents.PaymentErrors, (errors: IPayment) => {
  formState.errors = Object.values(errors).join(' ');
});

//Переходим к форме контактов
eventEmitter.on(EnEvents.PaymentFilled, () => {
  const { email: emailString, phone: phoneString } = order;
  formState.valid = validatorContacts.isValid({
    email: emailString,
    phone: phoneString,
  });
  try {
    const renderData = Object.assign(
      {},
      order.getContactsData(),
      formState.getFormState(),
    );
    modal.replaceContent(formContacts.render(renderData));
    modal.open();
  } catch (error) {
    console.error('#Ошибка с формированием окна контактов# ', error);
  }
});

//Обрабатываем ввод контактов (email)
eventEmitter.on(
  EnEvents.ContactsEmailChange,
  (data: { input: keyof IContacts; value: string }) => {
    order.email = data.value;
    try {
      if (validatorContacts.isValid(order)) {
        formState.valid = true;
      } else {
        formState.valid = false;
      }
      formContacts.setFormState(formState.getFormState());
    } catch (error) {
      console.error(
        '#Ошибка с валидированием формы контактов (email)# ',
        error,
      );
    }
  },
);

//Обрабатываем ввод контактов (phone)
eventEmitter.on(
  EnEvents.ContactsPhoneChange,
  (data: { input: keyof IContacts; value: string }) => {
    order.phone = data.value;
    try {
      if (validatorContacts.isValid(order)) {
        formState.valid = true;
      } else {
        formState.valid = false;
      }
      formContacts.setFormState(formState.getFormState());
    } catch (error) {
      console.error(
        '#Ошибка с валидированием формы контактов (phone)# ',
        error,
      );
    }
  },
);

//Обрабатываем ошибки формы контактов
eventEmitter.on(EnEvents.ContactsErrors, (errors: IContacts) => {
  formState.errors = Object.values(errors)
    .filter((error) => !!error)
    .join(' ');
});

//Отправляем заказ на сервер
eventEmitter.on(EnEvents.ContactsFilled, () => {
  order.items = basket.getProductIds();
  weblarekApi
    .postOrder(order)
    .then((result: IOrderResult) => {
      basket.clearBasket();
      cart.refreshCart(
        basket.getAllProducts(),
        basket.getTotalCost(),
        cardCartTemplate,
      );
      page.replaceCartCounter(basket.getProductsAmount());
      order.clearOrder();
      modal.replaceContent(purchase.render(result));
      eventEmitter.emit(EnEvents.CatalogAssemble);
    })
    .catch((error) => {
      console.error('#Ошибка с запросом к WeblarekApi# ', error);
    });
});
