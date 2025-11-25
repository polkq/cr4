import React from 'react';
import './ConversionHistory.css';
import { getCurrencySymbol } from '../utils/currencyRates';

const ConversionHistory = ({ history, onClear }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="conversion-history">
      <div className="history-header">
        <h3>История конвертаций</h3>
        {history.length > 0 && (
          <button className="clear-button" onClick={onClear}>
            Очистить
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="history-empty">
          <p>История конвертаций пуста</p>
          <p className="history-hint">Выполните конвертацию и нажмите "Сохранить конвертацию"</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-amount">
                <span className="amount-from">
                  {getCurrencySymbol(item.fromCurrency)} {item.amount.toLocaleString('ru-RU')} {item.fromCurrency}
                </span>
                <span className="arrow">→</span>
                <span className="amount-to">
                  {getCurrencySymbol(item.toCurrency)} {item.convertedAmount.toLocaleString('ru-RU')} {item.toCurrency}
                </span>
              </div>
              <div className="history-date">
                {formatDate(item.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversionHistory;

