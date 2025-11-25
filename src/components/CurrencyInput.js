import React from 'react';
import './CurrencyInput.css';

const CurrencyInput = ({ value, onChange, placeholder, readOnly = false }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Разрешаем только числа и точку/запятую для десятичных
    if (inputValue === '' || /^\d*[.,]?\d*$/.test(inputValue)) {
      // Заменяем запятую на точку для единообразия
      const normalizedValue = inputValue.replace(',', '.');
      onChange(normalizedValue);
    }
  };

  return (
    <input
      type="text"
      className={`currency-input ${readOnly ? 'readonly' : ''}`}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      readOnly={readOnly}
      inputMode="decimal"
    />
  );
};

export default CurrencyInput;

