# Проектная работа "Веб-ларек"

## Описание проекта

Онлайн-магазин вещей для веб-разработчика. Работа выполнена в контексте паттерна MVP в событийно-ориентированном подходе.

## Скриншот проекта

![скриншот проекта](https://github.com/vnn-ktt/web-larek-frontend/assets/106499823/cee6aa5c-5889-42fb-a55c-fffb3c2cb2af)

## Используемый стек технологий

_HTML, SCSS, JavaScript, TypeScript, Webpack_

## Структура проекта

- src/ — исходные файлы проекта
- src/components/ — директория компонент
- src/components/base/ — директория с базовым кодом

## Важные файлы

- src/pages/index.html — HTML-файл главной страницы
- src/scss/styles.scss — корневой файл стилей
- src/index.ts — точка входа приложения
- src/types/types.ts — файл с типами
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка, запуск и сборка

Для установки и запуска проекта необходимо выполнить команды:

```
npm install
npm run start
```

или

```
yarn
yarn start
```

Для сборки проекта необходимо выполнить команды:

```
npm run build
```

или

```
yarn build
```

## UML. Диаграмма классов

![UML](https://github.com/vnn-ktt/web-larek-frontend/assets/106499823/01510cd0-626e-45c3-a76f-4b5470840d5b)

## Константы, основные типы, перечисления и интерфейсы

### Константы

```typescript
const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;

const WEBLAREK_URL = `${process.env.API_ORIGIN}/content/weblarek`;

const PAYMENT_METHOD: { [key: string]: string } = {
  card: 'Онлайн',
  cash: 'При получении',
};

const CATEGORY_SELECTOR: { [key: string]: string } = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  другое: 'card__category_other',
  дополнительное: 'card__category_additional',
  кнопка: 'card__category_button',
};
```

### Перечисления

- `EnProductCategories` - _Определяет категории продуктов_

- `EnEvents` - _Определяет типы событий_

### Типы

- `TApiListResponse<Type>` - _Описывает ответ от API_

- `TApiPostMethods` - _Представляет поддерживаемые методы запроса в API (POST, PUT, DELETE)_

- `TEventName` - _Определяет имя события_

- `TSubscriber` - _Подписчик на событие, представленный в виде функции_

- `TEventEmitter` - _Представляет собой структуру объекта события, включающего имя события и данные, связанные с событием_

- `TPaymentMethods` - _Возможные способы оплаты (онлайн/офлайн)_

- `TProductStatus` - _Возможные статусы продукта (корзина/галерея)_

### Интерфейсы

- `IOnClick` - _Интерфейс для передачи колбэка onClick_

- `IEventEmitter` - _Интерфейс класса событий_

- `IApi` - _Интерфейс базового АПИ_

- `IWeblarekApi` - _Интерфейс АПИ вебларька_

- `IProduct` - _Интерфейс модели данных продукта_

- `ICatalog` - _Интерфейс каталога_

- `IBasket` - _Интерфейс корзины (model-компонент)_

- `IFormState` - _Интерфейс формы (model-компонент)_

- `IPayment` - _Интерфейс формы заказа: выбора оплаты и ввода адреса (model-компонент)_

- `IContacts` - _Интерфейс формы контактов: ввода email и телефона (model-компонент)_

- `IPurchase` - _Интерфейс покупки_

- `IOrder extends IPayment, IContacts, IPurchase` - _Интерфейс заказа_

- `IOrderResult` - _Интерфейс ответа от АПИ на запрос покупки товаров_

- `IModal` - _Интерфейс базового модального окна_

- `IPage` - _Интерфейс view-компонента страницы_

- `ICard` - _Интерфейс базовой карточки товара_

- `ICardPreview extends ICard` - _Интерфейс превью карточки товара_

- `ICart` - _Интерфейс корзины (view-компонент)_

- `IForm` - _Интерфейс базовой формы (view-компонент)_

- `IFormPayment` - _Интерфейс формы заказа: выбора оплаты и ввода адреса (view-компонент)_

- `IFormContacts` - _Интерфейс формы контактов: ввода email и телефона (view-компонент)_

## Базовые компоненты

### Класс EventEmitter

Описывает **событийно-ориентированный подход**. Предоставляет возможность компонентам подписаться на события и работать с оными наступившими.

**Конструктор** создает пустую коллекцию Map<EventName, Set<Subscriber>>() и сохраняет её в events. Конструкция предназначена для хранения событий и их подписчиков.

#### Методы класса:

- `on<T extends object>(eventName: EventName, callback: (event: T))` - регистрирует обработчик на событие.
- `off(eventName: EventName, callback: Subscriber)` - удаляет обработчик с события.
- `emit<T extends object>(eventName: string, data?: T)` - оповещает все обработчики о произошедшем событии с передачей данных для обработки.
- `onAll(callback: (event: TEventEmitter) => void)` - регистрирует обработчик на все события.
- `offAll()` - удаляет обработчик со всех событий.
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - генерирует событие в заданном контексте.

Список возможных событий (перечислены в enum EnEvents):

| Событие                | Описание                               |
| ---------------------- | -------------------------------------- |
| product:change         | Изменились данные продукта             |
| product:toggle         | По нажатию на карточку продукта        |
| catalog:change         | Изменился каталог товаров              |
| catalog:assemble       | Собран каталог товаров                 |
| basket:change          | Изменилась корзина (model)             |
| modal:open             | Открыто модальное окно                 |
| modal:close            | Закрыто модальное окно                 |
| card:open              | Открылась карточка товара              |
| cart:open              | Открылась коризна (view)               |
| cart:change            | Изменилась корзина (view)              |
| order:create           | Открылась форма ввода оплаты и адреса  |
| payment:change         | Изменился вид оплаты                   |
| payment-address:change | Изменился адрес                        |
| payment-errors:change  | Изменились ошибки формы оплаты         |
| order:submit           | Открылась форма ввода email и телефона |
| contacts-email:change  | Изменился email                        |
| contacts-phone:change  | Изменился телефон                      |
| contacts-errors:change | Изменились ошибки формы контактов      |
| contacts:filled        | Заказ сформирован                      |
| order:post             | Заказ отправлен на сервер              |

### Класс Api

Описывает **клиент-серверное взаимодействие** приложения.

**Конструктор** принимает аргументами основной URL сервера, объект опций и сохраняет их в поля baseUrl, \_options.

#### Методы класса:

- `handleResponse(response: Response): Promise<object>` - инкапсулированный метод, обрабатывает ответ от сервера (по умолчанию - в формате JSON).
- `get(uri: string)` - возвращает обработанные c handleResponse данные, отправленные с помощью метода GET.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - возвращает обработанные c handleResponse данные, отправленные с помощью метода POST.

### Класс Model

Описывает **модели данных**, а также связывает данные с событиями.

**Конструктор** принимает аргументом данные типа Partial<T> и объект типа EventEmitter, сохраняет их в поля data, events соответственно.

#### Методы класса:

- `emitChanges(event: EnEvents, payload?: object): void` - эмитирует событие с указанным именем **event** и дополнительными данными **payload**.

### Класс View

Описывает **пользовательский интерфейс**.

**Конструктор** принимает аргументом данные типа HTMLElement - контейнер.

#### Методы класса:

- `setTextContent(element: HTMLElement, value: unknown): void` - устанавливает текстовое содержимое элемента element в соответствии с заданным значением value.
- `setImage(element: HTMLImageElement, src: string, alt?: string): void` - устанавливает изображение в element через src, alt.
- `getChild<T extends HTMLElement>(selector: string): T` - возвращает дочерний элемент объекта класса.
- `toggleClass(element: HTMLElement, className: string, force?: boolean): void` - переключает класс className для элемента element.
- `toggleDisabled(element: HTMLElement, state: boolean): void` - изменяет доступность элемента element.
- `toggleHidden(element: HTMLElement): void` - переключает видимость элемента element.
- `render(data?: Partial<T>): HTMLElement` - обновляет свойства объекта на основе переданных данных data (рендерит элемент).

### Класс Validator

Представляет собой абстрактный базовый класс для **валидации данных**.

**Конструктор** инициализирует объект Validator с переданным объектом eventEmitter, инициализирует пустой объект errors для хранения сообщений об ошибках.

#### Методы класса:

- `abstract validate(data: T): boolean` - абстрактный метод, который должен быть реализован в подклассах для выполнения конкретной логики валидации. Принимает на вход данные типа **T**. Возвращает **true**, если данные валидны, и **false** в противном случае.

- `getErrors(): { [key: string]: string }` - возвращает объект, содержащий текущие ошибки валидации. Ключи объекта — это поля, которые не прошли валидацию, значения - это соответствующие сообщения об ошибках.

- `isValid(data: T): boolean` - проверяет валидность данных с помощью метода **validate**. Перед вызовом **validate** очищает объект **errors**. Возвращает **true**, если данные валидны, и **false** в противном случае.

- `emitChanges(event: EnEvents, payload?: object): void` - эмитирует событие с указанным именем **event** и дополнительными данными **payload**.

#### Пример использования:

```typescript
import { EnEvents } from '../../types/types';
import { EventEmitter } from './EventEmitter';
import { Validator } from './Validator';

class MyDataValidator extends Validator<MyDataType> {
  validate(data: MyDataType): boolean {
    let isValid = true;
    if (data.someField === '') {
      this.errors.someField = 'Field cannot be empty';
      isValid = false;
    }
    // Дополнительные проверки
    return isValid;
  }
}

const eventEmitter = new EventEmitter();
const validator = new MyDataValidator(eventEmitter);

const data = { someField: '' };
if (!validator.isValid(data)) {
  console.log(validator.getErrors()); // { someField: 'Field cannot be empty' }
}

validator.emitChanges(EnEvents.DATA_CHANGED, { newData: data });
```

В этом примере **MyDataValidator** расширяет **Validator**, предоставляя реализацию метода **validate** для проверки данных типа **MyDataType**. Если данные не валидны, ошибки сохраняются в объекте **errors** и могут быть получены методом **getErrors**. Метод **emitChanges** используется для отправки события о изменении данных.

## Model-компоненты

### Класс WeblarekApi

Расширяет функциональность базового класса Api и предоставляет методы для взаимодействия с **API Weblarek**. Он реализует интерфейс IWeblarekApi и включает методы для получения списка продуктов и размещения заказов.

**Конструктор** инициализирует экземпляр WeblarekApi с базовым URL для API запросов и URL для изображений Weblarek, сохраняет weblarek_url для использования при формировании полных путей к изображениям продуктов.

#### Методы класса:

- `getProductList(): Promise<IProduct[]>` - получает список продуктов с API, возвращает промис, который резолвится массивом объектов IProduct.
- `postOrder(order: IOrder): Promise<IOrderResult>` - отправляет заказ на API, принимает IOrder параметром, возвращает IOrderResult промисом.

### Класс Catalog

Расширяет функциональность базового класса Model и предоставляет методы для управления **каталогом продуктов**. Он реализует интерфейс **ICatalog** и включает методы для добавления, удаления, получения продуктов и сборки каталога.

**Конструктор** инициализирует экземпляр Catalog и хранит список продуктов. При вызове методов изменяет состояние каталога и эмитирует соответствующие события через eventEmitter.

#### Методы класса:

- `assembleCatalog(products: IProduct[]): void` - собирает каталог из массива продуктов, создает экземпляры класса Product для каждого продукта и сохраняет их. Эмитирует событие EnEvents.CatalogAssemble с обновленным каталогом.
- `getAllProducts(): IProduct[]` - возвращает массив всех продуктов в каталоге.

### Класс Basket

Расширяет функциональность базового класса Catalog и предоставляет методы для **управления корзиной покупок**. Он реализует интерфейс IBasket и включает методы для добавления и удаления продуктов из корзины, подсчета общей стоимости, количества продуктов и очистки корзины.

**Конструктор** инициализирует экземпляр Basket и хранит список продуктов в корзине. При вызове методов изменяет состояние корзины и эмитирует соответствующие события через eventEmitter.

#### Методы класса:

- `toggleProduct(product: IProduct): void` - добавляет продукт в корзину или удаляет его из корзины в зависимости от текущего статуса продукта. Эмитирует событие EnEvents.BasketChange с обновленным списком продуктов в корзине.
- `getAllProducts(): IProduct[]` - возвращает массив всех продуктов в корзине.
- `getProductsAmount(): number` - возвращает количество продуктов в корзине.
- `getProductsIds(): string[]` - возвращает id всех продуктов корзины.
- `getTotalCost(): number` - возвращает общую стоимость всех продуктов в корзине.
- `clearBasket(): void` - очищает корзину, устанавливая статус всех продуктов на 'gallery'. Эмитирует событие EnEvents.BasketChange с пустой корзиной.

### Класс Order

Описывает модель данных **заказа**. Конструктор не переопределен. Все поля класса неинкапслуированы. Реализует IOrder.

```typescript
interface IOrder {
  payment: TPaymentMethods = 'online';
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[] = [];
  getPaymentData(): Partial<IPayment>;
  getContactsData(): Partial<IContacts>;
  clearOrder(): void;
}
```

#### Методы класса:

- `getPaymentData(): Partial<IPayment>` - возвращает объект с данными о форме платежа-адреса, включая метод оплаты и адрес.
- `getContactsData(): Partial<IContacts>` - возвращает объект с контактными данными, включая телефон и email.
- `clearOrder(): void` - очищает заказ, сбрасывая метод оплаты на 'online', адрес, email, телефон на пустые строки, общую стоимость на null и очищая список товаров.

### Класс FormState

Расширяет функциональность базового класса Model и предоставляет методы для **управления состоянием любой формы**. Реализует интерфейс IFormState. Свойства класс неинкапсулированы.

```typescript
interface IFormState {
  valid: boolean;
  errors: string;
}
```

**Конструктор** инициализирует экземпляр FormState с начальными данными и объектом для эмиссии событий (eventEmitter). Изначально состояние формы устанавливается как невалидное с пустым списком ошибок.

#### Методы класса:

- `getFormState(): IFormState` - возвращает текущий объект состояния формы, содержащий валидность формы (valid) и строку ошибок (errors).

### Класс ValidatorPayment

Расширяет функциональность базового класса Validator и **предоставляет методы для валидации данных оплаты, адреса в заказе**.

**Конструктор** инициализирует экземпляр ValidatorPayment с объектом событий (eventEmitter). Регулярное выражение используется для проверки корректности адреса.

#### Методы класса:

- `validate(order: IOrder): boolean` - выполняет проверку данных оплаты в заказе, возвращает true, если данные валидны, и false в противном случае. В случае обнаружения ошибок, добавляет их в объект errors и эмитирует событие EnEvents.PaymentErrors.

### Класс ValidatorContacts

Расширяет функциональность базового класса Validator и **предоставляет методы для валидации контактных данных** в заказе. Он проверяет корректность форматов email и телефона.

**Конструктор** инициализирует экземпляр ValidatorContacts с объектом событий (eventEmitter). Регулярные выражения используются для проверки корректности форматов email и телефона.

#### Методы класса:

- `validate(order: IOrder): boolean` - выполняет проверку контактных данных в заказе, возвращает true, если данные валидны, и false в противном случае. В случае обнаружения ошибок, добавляет их в объект errors и эмитирует событие EnEvents.ContactsErrors.
- `private validateEmail(email: string): boolean` - приватный, проверяет корректность email и обновляет объект ошибок при необходимости.
- `private validatePhone(phone: string): boolean` - приватный, проверяет корректность телефона и обновляет объект ошибок при необходимости.

## View-компоненты

### Класс Modal

Расширяет функциональность базового класса View и предоставляет методы **для работы с модальным окном**. Реализует интерфейс IModal.

**Конструктор** инициализирует экземпляр Modal с контейнером, в котором находится модальное окно, и объектом для эмиссии событий (eventEmitter). Использует вспомогательные функции из utils для обеспечения наличия элементов кнопки закрытия и контента модального окна.

#### Методы класса:

- `isOpen(): boolean` - возвращает true, если модальное окно открыто (имеет класс 'modal_active'), и false в противном случае.
- `replaceContent(content: HTMLElement): void` - заменяет текущее содержимое модального окна новым переданным элементом.
- `open(): void` - открывает модальное окно, добавляя класс 'modal_active' к контейнеру, устанавливает флаг \_isOpened в true и эмитирует событие EnEvents.ModalOpen через eventEmitter.
- `close(): void` - закрывает модальное окно, удаляя класс 'modal_active' из контейнера, устанавливает флаг \_isOpened в false и эмитирует событие EnEvents.ModalClose через eventEmitter.

### Класс Page

Расширяет базовый класс View и предоставляет методы **для работы с элементами страницы**. Реализует интерфейс IPage, включая функции замены галереи изображений, обновления счетчика корзины и управления блокировкой страницы.

**Конструктор** инициализирует экземпляр Page с контейнером, в котором размещены основные элементы страницы, и объектом для управления событиями (eventEmitter), необходимым для взаимодействия с другими компонентами.

#### Методы класса:

- `replaceGallery(items: HTMLElement[]): void` - заменяет текущие элементы в галерее новыми переданными элементами.
- `replaceCartCounter(value: number): void` - обновляет текст счетчика корзины указанным числовым значением.
- `togglePageLock(value: boolean): void` - блокирует или разблокирует страницу в зависимости от переданного значения. При блокировке добавляет класс 'page\_\_wrapper_locked' к обертке страницы (\_wrapper), при разблокировке удаляет этот класс.

### Класс Cart

Расширяет базовый класс View и предоставляет методы для **управления содержимым корзины**. Реализует интерфейс ICart, включая функции обновления списка продуктов, общей стоимости и активации кнопки оформления заказа.

**Конструктор** инициализирует экземпляр Cart с контейнером, в котором расположены элементы корзины, и объектом для управления событиями (eventEmitter), необходимым для взаимодействия с другими компонентами.

#### Методы класса:

- `private updateTotal(total: number | string): void` - приватный, обновляет отображение общей стоимости корзины.
- `private toggleButtonOrder(items: IProduct[]): void` - приватный, активирует или деактивирует кнопку оформления заказа в зависимости от наличия продуктов в корзине.
- `setProductList(products: HTMLElement[]): void` - устанавливает карточки продуктов в корзине.
- `removeProducts(): void` - обнуляет состав коризны.
- `refreshCart(products: IProduct[], total: number | string): void` - обновляет кнопку и общую стоимостю товаров.

### Класс Card

Расширяет базовый класс View и предоставляет методы для **отображения базовой информации о продукте в карточке**. Реализует интерфейс ICard, включая функции установки и отображения заголовка и цены продукта.

**Конструктор** инициализирует экземпляр Card с контейнером, в котором размещены элементы карточки продукта (заголовок и цена).

#### Незащищенные методы:

- `render(data: IProduct): HTMLElement` - рендерит карточку продукта на основе переданных данных и возвращает контейнер карточки.

#### Защищенные методы:

- `setId(id: string): void` - устанавливает идентификатор продукта в dataset контейнера карточки.
- `setTitle(title: string): void` - устанавливает заголовок продукта в соответствующий элемент на карточке.
- `setPrice(price: number): void` - устанавливает цену продукта в соответствующий элемент на карточке. Если цена равна null, выводится сообщение "Бесценно".
- `build(data: IProduct): this` - строит карточку продукта на основе переданных данных, устанавливая заголовок, цену и идентификатор продукта.

### Класс CardBasket extends Card

Расширяет класс Card и предоставляет методы для **отображения информации о продукте в карточке корзины**. Реализует интерфейс ICard, включая функции установки и отображения индекса продукта и кнопки удаления из корзины.

**Конструктор** инициализирует экземпляр CardBasket с контейнером, в котором размещены элементы карточки корзины продукта (заголовок, цена, индекс, кнопка удаления).

#### Незащищенные методы:

- `render(data: IProduct): HTMLElement` - рендерит карточку продукта в корзине на основе переданных данных и возвращает контейнер карточки.

#### Наследуемые защищенные методы (от класса Card):

- `setId(id: string): void` - устанавливает идентификатор продукта в dataset контейнера карточки.
- `setTitle(title: string): void` - устанавливает заголовок продукта в соответствующий элемент на карточке.
- `setPrice(price: number): void` - устанавливает цену продукта в соответствующий элемент на карточке. Если цена равна null, выводится сообщение "Бесценно".

#### Дополнительные защищенные методы:

- `setIndex(index: string): void` - устанавливает индекс продукта в соответствующий элемент на карточке.
- `build(data: IProduct): this` - строит карточку продукта в корзине на основе переданных данных, устанавливая заголовок, цену, идентификатор, индекс.

### Класс CardCatalog extends Card

Расширяет класс Card и предоставляет методы для \***\*отображения дополнительной информации о продукте в карточке каталога**. Реализует интерфейс ICard, включая функции установки и отображения изображения продукта и категории.

**Конструктор** инициализирует экземпляр CardCatalog с контейнером, в котором размещены элементы карточки продукта (заголовок, цена, изображение, категория).

#### Незащищенные методы:

- `render(data: IProduct): HTMLElement` - рендерит карточку продукта на основе переданных данных и возвращает контейнер карточки.

#### Наследуемые защищенные методы (от класса Card):

- `setId(id: string): void` - устанавливает идентификатор продукта в dataset контейнера карточки.
- `setTitle(title: string): void` - устанавливает заголовок продукта в соответствующий элемент на карточке.
- `setPrice(price: number): void` - устанавливает цену продукта в соответствующий элемент на карточке. Если цена равна null, выводится сообщение "Бесценно".

#### Дополнительные защищенные методы:

- `setCardImage(image: string, title: string): void` - устанавливает изображение продукта и его заголовок на карточке.
- `setCategory(category: EnProductCategories): void` - устанавливает категорию продукта на карточке и применяет соответствующий класс стилей.
- `build(data: IProduct): this` - строит карточку продукта на основе переданных данных, устанавливая заголовок, цену, идентификатор продукта, изображение, категорию.

### Класс CardPreview extends Card

Расширяет класс CardCatalog и предоставляет методы для **отображения дополнительной информации о продукте в карточке-превью**. Реализует интерфейс ICardPreview, включая функции установки и отображения описания продукта и состояния кнопки действия.

**Конструктор** инициализирует экземпляр CardPreview с контейнером, в котором размещены элементы предварительной карточки продукта (заголовок, цена, изображение, категория, описание, кнопка действия).

#### Незащищенные методы:

- `render(data: IProduct): HTMLElement` - рендерит предварительную карточку продукта на основе переданных данных и возвращает контейнер карточки.
- `toggleButton(status: TProductStatus): void` - изменяет текст и функцию кнопки действия в зависимости от состояния продукта.

#### Наследуемые защищенные методы (от класса Card):

- `setId(id: string): void` - устанавливает идентификатор продукта в dataset контейнера карточки.
- `setTitle(title: string): void` - устанавливает заголовок продукта в соответствующий элемент на карточке.
- `setPrice(price: number): void` - устанавливает цену продукта в соответствующий элемент на карточке. Если цена равна null, выводится сообщение "Бесценно".

#### Дополнительные защищенные методы:

- `setCardImage(image: string, title: string): void` - устанавливает изображение продукта и его заголовок на карточке.
- `setCategory(category: EnProductCategories): void` - устанавливает категорию продукта на карточке и применяет соответствующий класс стилей.
- `setDescription(description: string): void` - устанавливает описание продукта на карточке.
- `build(data: IProduct): this` - строит карточку продукта на основе переданных данных, устанавливая заголовок, цену, идентификатор продукта, изображение, категорию.

#### Схема взаимодействия классов, производных от Card

![uml card](https://github.com/vnn-ktt/web-larek-frontend/assets/106499823/c5078502-5e5d-4c8c-affc-6c982412be34)

### Класс Form

Расширяет базовый класс View и предоставляет **методы для работы с формой**, включая управление ошибками и состоянием кнопки отправки. Реализует интерфейс IForm.

```typescript
interface IForm {
  setFormState(state: IFormState): void;
}
```

**Конструктор** инициализирует экземпляр Form с контейнером формы, в котором размещены элементы управления формой (сообщения об ошибках и кнопка отправки).

#### Незащищенные методы:

- `setFormState(state: IFormState): void` - устанавливает состояние формы на основе переданного объекта `state`, который содержит информацию о наличии ошибок (`errors`) и валидности формы (`valid`).

#### Защищенные методы:

- `setSumbitDisable(valid: boolean)` - устанавливает состояние активности кнопки отправки формы в зависимости от валидности формы (`valid`).
- `setErrors(errors: string)` - отображает сообщения об ошибках в соответствующем элементе `_errors`.

### Класс FormPayment

Расширяет класс Form и предоставляет **специфичные методы для работы с формой оплаты**. Реализует интерфейс IFormPayment.

```typescript
interface IFormPayment {
  render(data: Partial<IPayment> & Partial<IFormState>): HTMLFormElement;
}
```

**Конструктор** инициализирует экземпляр FormPayment с контейнером формы и объектом eventEmitter для обработки событий.

#### Незащищенные методы:

- `render(data: Partial<IPayment> & Partial<IFormState>): HTMLFormElement` - рендерит форму оплаты на основе переданных данных и возвращает контейнер формы.

#### Наследуемые защищенные методы (от класса Form):

- `setFormState(state: IFormState): void` - устанавливает состояние формы на основе переданного объекта `state`, который содержит информацию о наличии ошибок (`errors`) и валидности формы (`valid`).

#### Дополнительные защищенные методы:

- `setHandlers(): void` - устанавливает обработчики событий на кнопки выбора типа оплаты и на поля ввода адреса для отслеживания изменений и передачи соответствующих событий через eventEmitter.
- `handlePaymentMethodChange(value: TPaymentMethods, activeButton: HTMLButtonElement, inactiveButton: HTMLButtonElement): void` - обрабатывает изменение метода оплаты, активируя соответствующую кнопку и передавая событие через eventEmitter.
- `build(data: Partial<IPayment> & Partial<IFormState>): this` - строит форму на основе переданных данных, устанавливая выбранный метод оплаты и адрес, если они заданы, а также устанавливает состояние формы.

### Класс FormContacts

Расширяет класс Form и предоставляет **специфичные методы для работы с формой контактных данных**. Реализует интерфейс IFormContacts.

```typescript
interface IFormContacts {
  getPhoneField(): HTMLElement;
  render(data: Partial<IContacts> & Partial<IFormState>): HTMLFormElement;
}
```

**Конструктор** инициализирует экземпляр FormContacts с контейнером формы и объектом eventEmitter для обработки событий.

#### Незащищенные методы:

- `getPhoneField(): HTMLElement` - возвращает поле ввода телефона.
- `render(data: Partial<IContacts> & Partial<IFormState>): HTMLFormElement` - рендерит форму на основе переданных данных и возвращает контейнер формы.

#### Наследуемые защищенные методы (от класса Form):

- `setFormState(state: IFormState): void` - устанавливает состояние формы на основе переданного объекта `state`, который содержит информацию о наличии ошибок (`errors`) и валидности формы (`valid`).

#### Дополнительные защищенные методы:

- `setHandlers(): void` - устанавливает обработчики событий на поля ввода email и телефона для отслеживания изменений и передачи соответствующих событий через eventEmitter.
- `setEmail(value: string): void` - устанавливает значение email в поле ввода `_inputEmail`.
- `setPhone(value: string): void` - устанавливает значение телефона в поле ввода `_inputPhone`.
- `build(data: Partial<IContacts> & Partial<IFormState>): this` - строит форму на основе переданных данных, устанавливая значения email и телефона и устанавливая состояние формы.

### Класс Purchase

Класс Purchase расширяет базовый класс View и предоставляет **методы для отображения информации о покупке или заказе**.

**Конструктор** инициализирует экземпляр Purchase с контейнером, в котором находятся элементы для отображения информации о покупке (кнопка закрытия и общая информация о заказе).

#### Незащищенные методы

- `render(data: IOrderResult): HTMLElement` - рендерит информацию о покупке на основе переданных данных и возвращает контейнер покупки.

#### Защищенные методы

- `setTotal(value: number): void` - устанавливает общую сумму покупки или заказа в соответствующем элементе `_total`.
- `build(data: IOrderResult): this` - строит элементы покупки на основе переданных данных о результате заказа.
