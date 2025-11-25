import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';
import CurrencyInput from './CurrencyInput';
import CurrencySelect from './CurrencySelect';
import ConversionHistory from './ConversionHistory';
import { convertCurrency, getCurrencies, getCurrencySymbol } from '../utils/currencyRates';
import { loadConversionHistory, addToHistory, clearHistory } from '../utils/storage';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [history, setHistory] = useState([]);

  const currencies = getCurrencies();

  // Загрузить историю при монтировании компонента
  useEffect(() => {
    const loadedHistory = loadConversionHistory();
    setHistory(loadedHistory);
  }, []);

  // Конвертация при изменении параметров
  useEffect(() => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      const result = convertCurrency(parseFloat(amount), fromCurrency, toCurrency);
      setConvertedAmount(result.toString());
    } else {
      setConvertedAmount('');
    }
  }, [amount, fromCurrency, toCurrency]);

  // Обработка изменения суммы
  const handleAmountChange = (value) => {
    setAmount(value);
  };

  // Обработка изменения валюты "из"
  const handleFromCurrencyChange = (currency) => {
    setFromCurrency(currency);
  };

  // Обработка изменения валюты "в"
  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
  };

  // Обмен валют местами
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Сохранение конвертации в историю
  const handleConvert = () => {
    if (amount && !isNaN(amount) && parseFloat(amount) > 0 && convertedAmount) {
      const conversion = {
        id: Date.now(),
        amount: parseFloat(amount),
        fromCurrency,
        toCurrency,
        convertedAmount: parseFloat(convertedAmount),
        timestamp: new Date().toISOString(),
      };
      
      const newHistory = addToHistory(conversion);
      setHistory(newHistory);
    }
  };

  // Очистка истории
  const handleClearHistory = () => {
    const clearedHistory = clearHistory();
    setHistory(clearedHistory);
  };

  return (
    <div className="currency-converter">
      <div className="converter-card">
        <h2>Конвертация валют</h2>
        
        <div className="converter-form">
          <div className="input-group">
            <label>Из валюты:</label>
            <CurrencyInput
              value={amount}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
            />
            <CurrencySelect
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              currencies={currencies}
            />
          </div>

          <button 
            className="swap-button"
            onClick={handleSwapCurrencies}
            aria-label="Обменять валюты"
          >
            ⇄
          </button>

          <div className="input-group">
            <label>В валюту:</label>
            <CurrencyInput
              value={convertedAmount}
              onChange={() => {}}
              placeholder="Результат"
              readOnly
            />
            <CurrencySelect
              value={toCurrency}
              onChange={handleToCurrencyChange}
              currencies={currencies}
            />
          </div>
        </div>

        <div className="converter-info">
          <p>
            {amount && !isNaN(amount) && parseFloat(amount) > 0 ? (
              <>
                {getCurrencySymbol(fromCurrency)} {parseFloat(amount).toLocaleString('ru-RU')} = {getCurrencySymbol(toCurrency)} {parseFloat(convertedAmount).toLocaleString('ru-RU')}
              </>
            ) : (
              'Введите сумму для конвертации'
            )}
          </p>
        </div>

        <button 
          className="convert-button"
          onClick={handleConvert}
          disabled={!amount || isNaN(amount) || parseFloat(amount) <= 0}
        >
          Сохранить конвертацию
        </button>
      </div>

      <ConversionHistory 
        history={history} 
        onClear={handleClearHistory}
      />
    </div>
  );
};

export default CurrencyConverter;

