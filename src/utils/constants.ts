export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;

export const WEBLAREK_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const PAYMENT_METHOD: { [key: string]: string } = {
  card: 'Онлайн',
  cash: 'При получении',
};

export const CATEGORY_SELECTOR: { [key: string]: string } = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  другое: 'card__category_other',
  дополнительное: 'card__category_additional',
  кнопка: 'card__category_button',
};
