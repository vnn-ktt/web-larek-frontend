# Проектная работа "Веб-ларек"

## Описание проекта

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

## Основные типы

### EventEmitter

- type EventName = string | RegExp;

- type Subscriber = Function;

- type TEventEmitter = {
  eventName: EventName;
  data: unknown;
  };

### Api

- export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
  };
- export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

### Перечисления

- export enum TProductCategory {
  soft = 'софт-скил',
  hard = 'хард-скил',
  additional = 'дополнительное',
  other = 'другое',
  button = 'кнопка',
  }

- export enum EventType {
  ModelChange = 'model:change',
  CatalogPainted = 'catalog:painted',
  ProductSelect = 'product:select',
  BasketAdd = 'basket:add',
  BasketRemove = 'basket:remove',
  BasketOpen = 'basket:open',
  BasketClose = 'basket:close',
  BasketChange = 'basket:change',
  PaymentFilled = 'payment:filled',
  ContactsFilled = 'contacts:filled',
  OrderPost = 'order:post',
  ModalOpen = 'modal:open',
  ModalClose = 'modal:close',
  FormChange = 'form:change',
  }

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

Список возможных событий:

catalog:painted - каталог товаров отрисован
product:select - продукт выбран
basket:add - продукт добавлен в корзину
basket:remove - продукт удален из корзины
basket:open - корзина открыта
basket:close - корзина открыта
basket:change - корзина изменилась
payment:filled - пользователем заполнена форма оплаты
contacts:filled - пользователем заполнена форма контактов
order:post - заказ отправлен на сервер
modal:open - открыто модальное окно
modal:close - закрыто модальное окно
form:change - изменились данные в форме

### Класс Api

Описывает **клиент-серверное взаимодействие** приложения.

**Конструктор** принимает аргументами основной URL сервера, объект опций и сохраняет их в поля baseUrl, options.

Методы класса:

- handleResponse(response: Response): Promise<object> - инкапсулированный метод, обрабатывает ответ от сервера (по умолчанию - в формате JSON);
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

## Компоненты
