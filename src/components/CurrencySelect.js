import React from 'react';
import './CurrencySelect.css';
import { getCurrencySymbol } from '../utils/currencyRates';

const CurrencySelect = ({ value, onChange, currencies }) => {
  return (
    <select
      className="currency-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency} ({getCurrencySymbol(currency)})
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;

