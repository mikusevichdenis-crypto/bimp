import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  Boxes,
  ChevronDown,
  ClipboardList,
  Factory,
  FileSpreadsheet,
  HelpCircle,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  PackageSearch,
  Search,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Users,
  WalletCards,
  Wrench,
  X,
} from 'lucide-react';

const nav = [
  [LayoutDashboard, 'Дашборд'],
  [Boxes, 'Склад'],
  [PackageSearch, 'Екосистема'],
  [Users, 'Контрагенти'],
  [BarChart3, 'Продажі'],
  [ShoppingCart, 'Закупки', true],
  [WalletCards, 'Фінанси'],
  [Factory, 'Вир-во'],
  [Wrench, 'Сервіс і\nремонт'],
  [ClipboardList, 'Звіти'],
  [ListChecks, 'Завдання'],
];

const rows = [
  { product: 'PCB 4-шарова БК-42', supplier: 'PCB Solutions', need: 3, stock: 8, reserve: 1, available: 7, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
  { product: 'Мікроконтролер STM32', supplier: 'Electron Components', need: 4, stock: 6, reserve: 0, available: 6, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
  { product: 'CAN-трансивер', supplier: 'Electron Components', need: 7, stock: 4, reserve: 1, available: 3, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
  { product: 'DC-DC перетворювач 24V', supplier: 'PowerTech', need: 2, stock: 9, reserve: 1, available: 8, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
  { product: 'MOSFET силовий HQS148', supplier: 'PowerTech', need: 6, stock: 18, reserve: 4, available: 14, supplierOrder: 0, customerOrder: 20, workOrder: 0, production: 20, unit: 'шт' },
  { product: 'Роз’єм 6-pin', supplier: 'MicroParts', need: 8, stock: 16, reserve: 4, available: 12, supplierOrder: 0, customerOrder: 20, workOrder: 0, production: 20, unit: 'шт' },
  { product: 'Корпус алюмінієвий БК-42', supplier: 'MetalCase', need: 5, stock: 6, reserve: 1, available: 5, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
  { product: 'Етикетка БК-42', supplier: 'PrintLab', need: 6, stock: 4, reserve: 0, available: 4, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
  { product: 'Пакування БК-42', supplier: 'PackPro', need: 2, stock: 10, reserve: 2, available: 8, supplierOrder: 0, customerOrder: 10, workOrder: 0, production: 10, unit: 'шт' },
];

const tabs = ['Замовлення постачальникам', 'Надходження товарів', 'Повернення постачальникам', 'Оплата постачальникам', 'Планування закупок'];

function Logo() {
  return (
    <div className="logo-box">
      <span>Bimp</span>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [onlyNeed, setOnlyNeed] = useState(true);

  const visibleRows = useMemo(() => {
    return rows.filter((row) => {
      const matches = `${row.product} ${row.supplier}`.toLowerCase().includes(query.toLowerCase());
      return matches && (!onlyNeed || row.need > 0);
    });
  }, [query, onlyNeed]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div />
        <div className="topbar-actions">
          <span>⚯ Е-помічник</span>
          <span><LifeBuoy size={15} /> Підтримка</span>
          <span>▣ База знань</span>
          <span>◎ UA <ChevronDown size={14} /></span>
          <span className="divider" />
          <span>♙ Кабінет користувача</span>
          <span className="notification">2</span>
          <span className="avatar">Y</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <Logo />
          <div className="nav-list">
            {nav.map(([Icon, label, active]) => (
              <button key={label} className={`nav-item ${active ? 'active' : ''}`}>
                <Icon size={23} strokeWidth={1.7} />
                <span>{label.split('\n').map((x, i) => <React.Fragment key={i}>{x}{i === 0 && label.includes('\n') ? <br /> : null}</React.Fragment>)}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="main-panel">
          <div className="module-tabs">
            {tabs.map((tab) => <button key={tab} className={tab === 'Планування закупок' ? 'tab active' : 'tab'}>{tab}</button>)}
            <button className="dots">•••</button>
          </div>

          <section className="toolbar">
            <button className="plan-select">
              <span className="plan-label">Планувати по</span>
              <strong>БК-42 · партія 10 шт</strong>
              <ChevronDown size={16} />
            </button>
            <label className="search-box">
              <Search size={21} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Найменування / Артикул" />
              {query && <button onClick={() => setQuery('')}><X size={16} /></button>}
            </label>
            <button className="filter-btn"><SlidersHorizontal size={18} /> Фільтри</button>
            <button className={`switch-wrap ${onlyNeed ? 'on' : ''}`} onClick={() => setOnlyNeed(v => !v)}>
              <span className="switch"><i /></span>
              <span>Необхідно закупити</span>
            </button>
            <div className="toolbar-spacer" />
            <button className="icon-btn"><FileSpreadsheet size={23} /></button>
            <button className="icon-btn"><Settings size={22} /></button>
          </section>

          <section className="context-strip">
            <div><span className="dot blue" /> Виріб: <strong>Блок керування «БК-42»</strong></div>
            <div><span className="dot green" /> Замовлення на виробництво: <strong>10 шт</strong></div>
            <div><span className="dot amber" /> Дефіцит: <strong>43 позиції / шт. до закупівлі</strong></div>
          </section>

          <section className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th className="num">№</th>
                    <th className="product">Товар</th>
                    <th>Постачальник</th>
                    <th className="metric">Необхідно<br/>закупити</th>
                    <th className="metric">Поточний<br/>залишок</th>
                    <th className="metric">Резерв</th>
                    <th className="metric">Доступний<br/>залишок</th>
                    <th className="metric">Замовлення<br/>покупця</th>
                    <th className="metric">Замовлення-<br/>наряд</th>
                    <th className="metric">Замовлення на<br/>виробництво</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, idx) => (
                    <tr key={row.product}>
                      <td className="num">{idx + 1}</td>
                      <td className="product"><span className="cube">◇</span>{row.product}</td>
                      <td>{row.supplier}</td>
                      <td className="metric need"><strong>{row.need} {row.unit}</strong></td>
                      <td className="metric">{row.stock} {row.unit}</td>
                      <td className="metric">{row.reserve} {row.unit}</td>
                      <td className="metric available">{row.available} {row.unit}</td>
                      <td className="metric">{row.customerOrder} {row.unit}</td>
                      <td className="metric muted">{row.workOrder} {row.unit}</td>
                      <td className="metric production"><strong>{row.production} {row.unit}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="pager muted">≪</div>
              <div className="pager muted">‹</div>
              <span>1–{visibleRows.length} із {visibleRows.length}</span>
              <div className="pager">›</div>
              <div className="pager">≫</div>
              <span className="rows-label">Рядків на сторінці</span>
              <button className="rows-count">100 <ChevronDown size={16}/></button>
              <div className="legend">
                <span><i className="legend-chip purple" /> потреба виробництва</span>
                <span><i className="legend-chip red" /> дефіцит до закупівлі</span>
              </div>
            </div>
          </section>

          <div className="version">1.121.38 · demo</div>
        </main>
      </div>
    </div>
  );
}

export default App;
