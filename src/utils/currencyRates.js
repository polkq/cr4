// Фиктивные курсы валют (базовая валюта - USD)
export const currencyRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  RUB: 75.0,
  CNY: 6.5,
  CHF: 0.92,
  AUD: 1.35,
  CAD: 1.25,
  INR: 74.0,
};

// Получить курс валюты относительно базовой (USD)
export const getRate = (fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return 1;
  
  // Конвертация через USD
  const fromRate = currencyRates[fromCurrency];
  const toRate = currencyRates[toCurrency];
  
  if (!fromRate || !toRate) return 1;
  
  // Конвертируем fromCurrency -> USD -> toCurrency
  return toRate / fromRate;
};

// Конвертировать сумму
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (!amount || amount <= 0) return 0;
  const rate = getRate(fromCurrency, toCurrency);
  return parseFloat((amount * rate).toFixed(2));
};

// Получить список всех валют
export const getCurrencies = () => Object.keys(currencyRates);

// Получить символ валюты
export const getCurrencySymbol = (currency) => {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    RUB: '₽',
    CNY: '¥',
    CHF: 'Fr',
    AUD: 'A$',
    CAD: 'C$',
    INR: '₹',
  };
  return symbols[currency] || currency;
};

