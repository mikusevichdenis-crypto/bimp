import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  SquareArrowOutUpRight,
  Package,
} from 'lucide-react';

const stages = [
  'SMT-МОНТАЖ',
  'РУЧНА ПАЙКА',
  'ПРОШИВКА КОНТРОЛЕРА',
  'ЗБІРКА КОРПУСУ',
  'ФУНКЦІОНАЛЬНИЙ ТЕСТ',
  'МАРКУВАННЯ',
  'ПАКУВАННЯ',
];

const materials = [
  { name: 'Плата керування БК-42', mod: 'V3.1 · 4-шарова', qty: 10, unit: 'Шт', price: 240, sum: 2400 },
  { name: 'Мікроконтролер STM32', mod: 'STM32F103', qty: 10, unit: 'Шт', price: 220, sum: 2200 },
  { name: 'CAN-трансивер', mod: 'TJA1050', qty: 10, unit: 'Шт', price: 70, sum: 700 },
  { name: 'Модуль живлення БК-42', mod: 'Напівфабрикат · V3.1', qty: 10, unit: 'Шт', price: 110, sum: 1100 },
  { name: 'Силові MOSFET / реле', mod: 'HQ5148', qty: 10, unit: 'компл.', price: 160, sum: 1600 },
  { name: 'Джгут кабельний БК-42', mod: 'V3.1 · 6-pin', qty: 10, unit: 'компл.', price: 95, sum: 950 },
  { name: 'Пасивні компоненти', mod: 'SMD-комплект', qty: 10, unit: 'компл.', price: 75, sum: 750 },
  { name: 'Корпус БК-42', mod: 'V3.1 · алюмінієвий', qty: 10, unit: 'Шт', price: 170, sum: 1700 },
  { name: 'Кріплення та монтажні елементи', mod: 'M3 · комплект', qty: 10, unit: 'компл.', price: 25, sum: 250 },
  { name: 'Маркування та упаковка', mod: 'БК-42 V3.1', qty: 10, unit: 'компл.', price: 15, sum: 150 },
];

const fmt = (value) => value.toLocaleString('uk-UA', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function App() {
  const [query, setQuery] = useState('');

  const visibleMaterials = materials.filter((item) =>
    `${item.name} ${item.mod}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="spec-page">
      <section className="spec-window">
        <header className="top-tabs">
          <div className="window-controls">
            <span className="chevrons">«</span>
            <span className="layout-icon">▥</span>
            <span className="layout-icon">▥</span>
          </div>

          <nav className="tabs">
            <button>Етапи та операції</button>
            <button className="active">Матеріали та комплектуючі</button>
            <button>Аналітика</button>
            <button>Файли</button>
            <button className="muted">Історія змін</button>
          </nav>

          <button className="help-btn"><CircleHelp size={15} /> Довідка</button>
        </header>

        <section className="cost-methods">
          <span className="method-label">Метод розрахунку собівартості</span>
          <div className="segmented">
            <button className="active">По залишковій собівартості</button>
            <button>По останній ціні закупівлі</button>
            <button>По середньозваженій ціні</button>
          </div>
          <div className="method-note">
            <CircleHelp size={17} />
            <span>Використовує фактичну вартість залишків по партіях для кожного компонента</span>
          </div>
        </section>

        <section className="work-area">
          <aside className="stages-panel">
            <div className="stages-header">
              <button className="back-btn"><ArrowLeft size={19} /></button>
              <strong>Етапи та операції</strong>
              <span className="sort-icon">↕</span>
            </div>

            <div className="stage-list">
              {stages.map((stage) => (
                <button className="stage-row" key={stage}>
                  <ChevronRight size={15} />
                  <span>{stage}</span>
                </button>
              ))}
            </div>

            <button className="show-all">Показати всі 54 матеріали</button>
          </aside>

          <section className="materials-panel">
            <div className="table-toolbar">
              <div className="toolbar-left">
                <button className="primary-outline"><Plus size={18} /> Компонент</button>
                <button className="secondary-outline"><Download size={17} /> Імпорт</button>
              </div>
              <div className="toolbar-right">
                <label className="search-control">
                  <Search size={17} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Пошук"
                  />
                </label>
                <button className="secondary-outline"><SquareArrowOutUpRight size={16} /> Інші дії <ChevronDown size={14} /></button>
              </div>
            </div>

            <div className="table-wrap">
              <table className="materials-table">
                <thead>
                  <tr>
                    <th className="check-col"><span className="fake-check" /></th>
                    <th className="num-col">№</th>
                    <th className="name-col">Номенклатура</th>
                    <th className="mod-col">Модифікація</th>
                    <th className="qty-col">К-сть</th>
                    <th className="unit-col">Од. вим</th>
                    <th className="price-col">Ціна</th>
                    <th className="sum-col">Сума</th>
                    <th className="settings-col"><SlidersHorizontal size={16} /></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleMaterials.map((item, index) => (
                    <tr key={item.name}>
                      <td className="check-col"><span className="fake-check" /></td>
                      <td className="num-col">{index + 1}</td>
                      <td className="name-col">
                        <span className="product-name"><Package size={18} /> {item.name}</span>
                      </td>
                      <td className="mod-col">{item.mod}</td>
                      <td className="qty-col">{item.qty}</td>
                      <td className="unit-col">{item.unit}</td>
                      <td className="price-col">{fmt(item.price)} UAH</td>
                      <td className="sum-col">{fmt(item.sum)} UAH</td>
                      <td className="settings-col"><MoreHorizontal size={18} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="horizontal-scroll"><span /></div>
          </section>
        </section>

        <footer className="totals-bar">
          <div>Сума матеріалів <strong>11 800.00 UAH</strong></div>
          <div>Вартість операцій <strong>2 450.00 UAH</strong></div>
          <div>Планова собівартість <strong>14 250.00 UAH</strong></div>
        </footer>
      </section>
    </main>
  );
}

export default App;
