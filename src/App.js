import React from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>💱 Конвертер валют</h1>
        <p>Пересчёт валют по фиктивным курсам</p>
      </header>
      <main className="App-main">
        <CurrencyConverter />
      </main>
    </div>
  );
}

export default App;

