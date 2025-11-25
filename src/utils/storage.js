// Утилиты для работы с localStorage

const STORAGE_KEY = 'currency_converter_history';

// Сохранить историю конвертаций
export const saveConversionHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Ошибка при сохранении истории:', error);
  }
};

// Загрузить историю конвертаций
export const loadConversionHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Ошибка при загрузке истории:', error);
    return [];
  }
};

// Добавить запись в историю
export const addToHistory = (conversion) => {
  const history = loadConversionHistory();
  const newHistory = [conversion, ...history].slice(0, 50); // Храним последние 50 конвертаций
  saveConversionHistory(newHistory);
  return newHistory;
};

// Очистить историю
export const clearHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('Ошибка при очистке истории:', error);
    return [];
  }
};

