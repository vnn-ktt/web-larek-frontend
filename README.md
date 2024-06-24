# Проектная работа "Веб-ларек"

## Описание проекта

Онлайн-магазин вещей для веб-разработчика. Работа выполнена в контексте паттерна MVP в событийно-ориентированном подходе.

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

## Основные типы, перечисления и интерфейсы

### Перечисления

- enum EnProductCategories - _Определяет категории продуктов_

- enum EnEvents - _Определяет типы событий_

### Типы и общие интерфейсы

- type TApiListResponse<Type> - _Описывает ответ от API_

- type TApiPostMethods - _Представляет поддерживаемые методы запроса в API (POST, PUT, DELETE)_

- type TEventName - _Определяет имя события_

- type TSubscriber - _Подписчик на событие, представленный в виде функции_

- type TEventEmitter - _Представляет собой структуру объекта события, включающего имя события и данные, связанные с событием_

- type TPaymentMethods - _Возможные способы оплаты (онлайн/офлайн)_

- type TProductStatus - _Возможные статусы продукта (корзина/галерея)_

- interface IOnClick - _Интерфейс для передачи колбэка onClick_

### Интерфейсы базовых компонент

- interface IApi - _Интерфейс базового АПИ_

- interface IEventEmitter - _Интерфейс объекта событий_

  ### Интерфейсы моделей данных

- interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: EnProductCategories;
  selected: boolean;
  } _// интерфейс описывает продукт_

- interface ICatalog {
  products: IProduct[];
  } _// интерфейс описывает каталог продуктов_

- interface IBasket {
  products: IProduct[];
  getProducts(): IProduct[];
  getTotal(): number;
  getAmount(): number;
  addProduct(product: IProduct): void;
  removeProduct(product: IProduct): void;
  clearBasket(): void;
  } _// интерфейс описывает корзину продуктов_

- interface IPayment {
  paymentMethod: TPaymentMethods;
  address: string;
  } _// интерфейс описывает информацию о платеже_

- interface IContacts {
  email: string;
  phone: string;
  } _// интерфейс описывает контактные данные_

- interface ISuccessOrder {
  total: number;
  } _// интерфейс описывает информацию об успешном заказе_

- interface IOrder extends IPayment, IContacts, ISuccessOrder {} _// интерфейс описывает информацию о заказе, включая информацию о платеже, контактные данные и информацию об успешном заказе_

### Интерфейсы GUI

- interface IPage {
  catalog: HTMLElement[];
  productsCounter: number;
  } _// интерфейс описывает страницу_

- interface IBasketView {
  list: HTMLElement[];
  total: number;
  } _// интерфейс описывает корзину товаров_

## Базовые компоненты

### Класс EventEmitter

Описывает **событийно-ориентированный подход**. Предоставляет возможность компонентам подписаться на события и работать с оными наступившими.

**Конструктор** создает пустую коллекцию Map<EventName, Set<Subscriber>>() и сохраняет её в events. Конструкция предназначена для хранения событий и их подписчиков.

Методы класса:

- on<T extends object>(eventName: EventName, callback: (event: T)) - регистрирует обработчик на событие;
- off(eventName: EventName, callback: Subscriber) - удаляет обработчик с события;
- emit<T extends object>(eventName: string, data?: T) - оповещает все обработчики о произошедшем событии с передачей данных для обработки;
- onAll(callback: (event: TEventEmitter) => void) - регистрирует обработчик на все события;
- offAll() - удаляет обработчик со всех событий;
- trigger<T extends object>(eventName: string, context?: Partial<T>) - генерирует событие в заданном контексте

Список возможных событий (таблица имеет не окончательный вид):

| Событие         | Описание                                |
| --------------- | --------------------------------------- |
| model:change    | Изменилась модель данных                |
| catalog:painted | Каталог товаров отрисован               |
| product:select  | Продукт выбран                          |
| basket:add      | Продукт добавлен в корзину              |
| basket:remove   | Продукт удален из корзины               |
| basket:open     | Корзина открыта                         |
| basket:close    | Корзина закрыта                         |
| basket:change   | Корзина изменилась                      |
| payment:filled  | Пользователем заполнена форма оплаты    |
| contacts:filled | Пользователем заполнена форма контактов |
| order:post      | Заказ отправлен на сервер               |
| modal:open      | Открыто модальное окно                  |
| modal:close     | Закрыто модальное окно                  |
| form:change     | Данные в форме изменились               |

### Класс Api

Описывает **клиент-серверное взаимодействие** приложения.

**Конструктор** принимает аргументами основной URL сервера, объект опций и сохраняет их в поля baseUrl, \_options.

Методы класса:

- \_handleResponse(response: Response): Promise<object> - инкапсулированный метод, обрабатывает ответ от сервера (по умолчанию - в формате JSON);
- get(uri: string) - возвращает обработанные c handleResponse данные, отправленные с помощью метода GET;
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - возвращает обработанные c handleResponse данные, отправленные с помощью метода POST

### Класс Model

Описывает **модели данных**, а также связывает данные с событиями.

**Конструктор** принимает аргументом данные типа Partial<T> и объект типа EventEmitter, сохраняет их в поля data, events соответственно.

Методы класса:

- setData(data: Partial<T>): void - сеттер данных;
- getData(): Partial<T> | null - геттер данных;
- updateData(updatedData: Partial<T>): void - производит обновление данных с возможностью объединения старых и новых оных;
- clearData(): void - присваивает null полю data;
- protected changed(): void - для оповещения других классов об изменениях в модели

### Класс View

Описывает **пользовательский интерфейс**.

**Конструктор** принимает аргументом данные типа HTMLElement.

Методы класса:

- setText(element: HTMLElement, value: unknown): void - устанавливает текстовое содержимое элемента element в соответствии с заданным значением value;
- toggleClass(element: HTMLElement, className: string, force?: boolean): void - переключает класс className для элемента element;
- toggleDisabled(element: HTMLElement, state: boolean): void - изменяет доступность элемента element;
- toggleHidden(element: HTMLElement): void - переключает видимость элемента element;
- render(data?: Partial<T>): HTMLElement - обновляет свойства объекта на основе переданных данных data (рендерит элемент)

## Компоненты
