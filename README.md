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

## UML. Диаграмма классов

## Основные типы, перечисления и интерфейсы

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

- `IBasket extends ICatalog` - _Интерфейс корзины (model-компонент)_

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

- `on<T extends object>(eventName: EventName, callback: (event: T))` - регистрирует обработчик на событие
- `off(eventName: EventName, callback: Subscriber)` - удаляет обработчик с события
- `emit<T extends object>(eventName: string, data?: T)` - оповещает все обработчики о произошедшем событии с передачей данных для обработки
- `onAll(callback: (event: TEventEmitter) => void)` - регистрирует обработчик на все события
- `offAll()` - удаляет обработчик со всех событий
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - генерирует событие в заданном контексте

Список возможных событий (таблица имеет не окончательный вид):

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

- `\_handleResponse(response: Response): Promise<object>` - инкапсулированный метод, обрабатывает ответ от сервера (по умолчанию - в формате JSON)
- `get(uri: string)` - возвращает обработанные c handleResponse данные, отправленные с помощью метода GET
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - возвращает обработанные c handleResponse данные, отправленные с помощью метода POST

### Класс Model

Описывает **модели данных**, а также связывает данные с событиями.

**Конструктор** принимает аргументом данные типа Partial<T> и объект типа EventEmitter, сохраняет их в поля data, events соответственно.

#### Методы класса:

- `emitChanges(event: EnEvents, payload?: object): void` - эмитирует событие с указанным именем **event** и дополнительными данными **payload**.

### Класс View

Описывает **пользовательский интерфейс**.

**Конструктор** принимает аргументом данные типа HTMLElement - контейнер.

#### Методы класса:

- `setTextContent(element: HTMLElement, value: unknown): void` - устанавливает текстовое содержимое элемента element в соответствии с заданным значением value
- `setImage(element: HTMLImageElement, src: string, alt?: string): void` - устанавливает изображение в element через src, alt
- `getChild<T extends HTMLElement>(selector: string): T` - возвращает дочерний элемент объекта класса
- `toggleClass(element: HTMLElement, className: string, force?: boolean): void` - переключает класс className для элемента element
- `toggleDisabled(element: HTMLElement, state: boolean): void` - изменяет доступность элемента element
- `toggleHidden(element: HTMLElement): void` - переключает видимость элемента element
- `render(data?: Partial<T>): HTMLElement` - обновляет свойства объекта на основе переданных данных data (рендерит элемент)

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
