import React, { useState, useEffect, useMemo } from 'react';
// import Papa from 'papaparse'; // Removed external dependency
import { 
  MapPin, 
  Check, 
  Star, 
  Filter, 
  Search, 
  Briefcase, 
  Award, 
  ArrowRight,
  Info,
  Phone,
  Mail,
  ExternalLink,
  Menu,
  X,
  Globe 
} from 'lucide-react';

// --- MOCK DATA (Replaced CSV string with JSON to avoid external dependency issues) ---
const PARTNERS_DATA = [
  {
    id: "1",
    name: "TechInnova Group",
    logo_text: "TI",
    description: "Ми спеціалізуємося на комплексній автоматизації виробничих підприємств та великого рітейлу. Маємо досвід інтеграції Bimp зі складними логістичними системами WMS.",
    city: "Київ",
    business_type: "Виробництво|Торгівля",
    industries: "Автозапчастини|Електрообладнання|Меблі",
    partner_type: "ERP інтегратор",
    certification_level: "Gold",
    competencies: "API|WMS|Audit",
    contacts: "+380501112233",
    case_link: "https://example.com"
  },
  {
    id: "2",
    name: "SmartBusiness Solutions",
    logo_text: "SB",
    description: "Експерти з впровадження ERP у сфері E-commerce. Налаштовуємо синхронізацію з маркетплейсами, Rozetka, Prom та службами доставки.",
    city: "Львів",
    business_type: "E-commerce|Торгівля",
    industries: "Електроніка|Одяг|Взуття",
    partner_type: "ERP інтегратор|Впровадження CRM",
    certification_level: "Certified",
    competencies: "E-com|Integration",
    contacts: "+380674445566",
    case_link: "https://example.com"
  },
  {
    id: "3",
    name: "AgroTech Systems",
    logo_text: "AT",
    description: "Спеціалізовані рішення для агро-сектору та складської логістики. Інтеграція з ваговим обладнанням та GPS-моніторингом.",
    city: "Одеса",
    business_type: "Виробництво",
    industries: "Оптова торгівля сільськогосподарською продукцією|Добрива",
    partner_type: "ERP інтегратор",
    certification_level: "Certified",
    competencies: "Agro|IoT",
    contacts: "+380937778899",
    case_link: "https://example.com"
  },
  {
    id: "4",
    name: "LogicFlow",
    logo_text: "LF",
    description: "Консалтинг та автоматизація фінансового обліку. Допомагаємо навести лад у цифрах та налаштувати управлінську звітність у Bimp.",
    city: "Вся Україна",
    business_type: "Торгівля",
    industries: "FMCG|Продукти харчування|Напої",
    partner_type: "Консалтинг",
    certification_level: "Certified",
    competencies: "Finance|Audit",
    contacts: "+380445556677",
    case_link: "https://example.com"
  },
  {
    id: "5",
    name: "CRM Master",
    logo_text: "CM",
    description: "Впровадження CRM-систем та налаштування базового обліку в Bimp для малого бізнесу. Швидкий старт за 2 тижні.",
    city: "Вся Україна",
    business_type: "E-commerce",
    industries: "Канцелярські товари|Іграшки|Квіти",
    partner_type: "Впровадження CRM",
    certification_level: "Registered",
    competencies: "QuickStart",
    contacts: "+380991112233",
    case_link: "https://example.com"
  },
  {
    id: "6",
    name: "BuildSoft",
    logo_text: "BS",
    description: "Автоматизація будівельних магазинів та оптових баз. Облік серійних номерів та партій.",
    city: "Київ",
    business_type: "Торгівля",
    industries: "Будматеріали|Сантехніка|Інструменти",
    partner_type: "ERP інтегратор",
    certification_level: "Gold",
    competencies: "Retail|Trade",
    contacts: "+380509990011",
    case_link: "https://example.com"
  },
  {
    id: "7",
    name: "PharmaTech",
    logo_text: "PT",
    description: "Спеціалізовані рішення для аптечних мереж та дистриб'юторів фармпрепаратів. Контроль термінів придатності.",
    city: "Київ",
    business_type: "Торгівля",
    industries: "Фармацевтика|Медичне обладнання",
    partner_type: "ERP інтегратор",
    certification_level: "Certified",
    competencies: "Pharma|Regulation",
    contacts: "+380633332211",
    case_link: "https://example.com"
  },
  {
    id: "8",
    name: "FashionConsult",
    logo_text: "FC",
    description: "Допомагаємо брендам одягу побудувати прозорий облік від виробництва до полиці магазину.",
    city: "Львів",
    business_type: "Виробництво|E-commerce",
    industries: "Текстиль|Одяг|Взуття",
    partner_type: "Консалтинг",
    certification_level: "Registered",
    competencies: "Production|Fashion",
    contacts: "+380678889900",
    case_link: "https://example.com"
  }
];

// --- CONSTANTS ---
const INDUSTRIES_LIST = [
  "Оптова торгівля сільськогосподарською продукцією", "Автозапчастини", "Будматеріали", 
  "Взуття", "Добрива", "Електрообладнання", "Електроніка", "Іграшки", 
  "Канцелярські товари", "Квіти", "Косметика", "Медичне обладнання", 
  "Меблі", "Напої", "Одяг", "Освітлення", "Побутова хімія", 
  "Побутова техніка", "Продукти харчування", "Сантехніка", "Спортивні товари", 
  "Текстиль", "FMCG", "Упаковка", "Фармацевтика", "Ювелірні вироби"
];

const CITIES = ["Всі міста", "Київ", "Львів", "Одеса", "Дніпро", "Харків"];

// --- COMPONENTS ---

const Badge = ({ type, children }) => {
  const styles = {
    Gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Certified: "bg-blue-100 text-blue-800 border-blue-200",
    Registered: "bg-slate-100 text-slate-600 border-slate-200",
    default: "bg-gray-100 text-gray-600 border-gray-200"
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[type] || styles.default}`}>
      {children}
    </span>
  );
};

const FilterSection = ({ title, children }) => {
  return (
    <div className="mb-6 border-b border-slate-100 pb-6 last:border-0">
      <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
};

const PartnerCard = ({ partner, onContactClick }) => {
  const isGold = partner.certification_level === 'Gold';
  const isAllUkraine = partner.city === "Вся Україна";

  return (
    <div className={`bg-white rounded-xl border p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg relative group ${isGold ? 'border-yellow-200 shadow-yellow-50' : 'border-slate-200 shadow-sm'}`}>
      {isGold && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg z-10 flex items-center gap-1">
          <Star size={10} fill="currentColor" /> GOLD PARTNER
        </div>
      )}
      
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold shadow-sm ${isGold ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {partner.logo_text}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#3a5f8a] transition-colors">
            {partner.name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            {isAllUkraine ? <Globe size={12} /> : <MapPin size={12} />}
            {partner.city}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge type={partner.certification_level}>{partner.certification_level}</Badge>
        {partner.partner_type.slice(0, 2).map((type, idx) => (
          <span key={idx} className="px-2 py-0.5 rounded text-xs bg-slate-50 text-slate-600 border border-slate-100">
            {type}
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
        {partner.description}
      </p>

      <div className="mb-5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Галузі:</span>
        <div className="flex flex-wrap gap-2">
          {partner.industries.map((ind, idx) => (
            <span key={idx} className="px-2 py-1 bg-[#eff6ff] text-[#3a5f8a] text-[10px] font-medium rounded border border-[#dbeafe]">
              {ind}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 mt-auto">
        <button 
          onClick={() => onContactClick(partner.name)}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-[#3a5f8a] py-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200 hover:border-slate-300"
        >
          <Phone size={16} />
          Зв'язатися
        </button>
      </div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose, partnerName }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Дякуємо! Ваш запит для зв'язку з "${partnerName}" прийнято. Ми зателефонуємо вам найближчим часом.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <div 
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#f8fafc] border-b border-slate-100 p-5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Зв'язатися з партнером</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-6">
            Залиште свої контакти, і ми організуємо комунікацію з <strong>{partnerName}</strong>.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5" htmlFor="c-name">Ваше ім'я</label>
              <input type="text" id="c-name" required placeholder="Іван Іваненко" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#3a5f8a] focus:ring-4 focus:ring-[#3a5f8a]/10 transition-all text-slate-800" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5" htmlFor="c-phone">Номер телефону</label>
              <input type="tel" id="c-phone" required placeholder="+38 (0XX) XXX-XX-XX" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#3a5f8a] focus:ring-4 focus:ring-[#3a5f8a]/10 transition-all text-slate-800" />
            </div>
            <button type="submit" className="w-full bg-[#3a5f8a] text-white py-3 rounded-lg font-semibold hover:bg-[#2c4a6e] transition-colors shadow-md hover:shadow-lg mt-2">Чекаю на дзвінок</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function PartnerMarketplace() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPartnerName, setSelectedPartnerName] = useState("");

  const [selectedCity, setSelectedCity] = useState("Всі міста");
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedPartnerTypes, setSelectedPartnerTypes] = useState([]);
  const [selectedCertLevel, setSelectedCertLevel] = useState([]);

  const handleContactClick = (partnerName) => {
    setSelectedPartnerName(partnerName);
    setIsContactModalOpen(true);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate async loading without external parser
    setTimeout(() => {
      // Manual data processing that mimics CSV parsing
      const processedData = PARTNERS_DATA.map(partner => ({
        ...partner,
        business_type: partner.business_type.split('|'),
        industries: partner.industries.split('|'),
        partner_type: partner.partner_type.split('|'),
        competencies: partner.competencies.split('|'),
      }));
      
      setPartners(processedData);
      setFilteredPartners(processedData);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = partners;

    if (selectedCity !== "Всі міста") {
      result = result.filter(p => p.city === selectedCity || p.city === "Вся Україна");
    }

    if (selectedBusinessTypes.length > 0) {
      result = result.filter(p => p.business_type.some(bt => selectedBusinessTypes.includes(bt)));
    }

    if (selectedIndustries.length > 0) {
      result = result.filter(p => p.industries.some(ind => selectedIndustries.includes(ind)));
    }

    if (selectedPartnerTypes.length > 0) {
      result = result.filter(p => p.partner_type.some(pt => selectedPartnerTypes.includes(pt)));
    }

    if (selectedCertLevel.length > 0) {
      result = result.filter(p => selectedCertLevel.includes(p.certification_level));
    }

    setFilteredPartners(result);
  }, [partners, selectedCity, selectedBusinessTypes, selectedIndustries, selectedPartnerTypes, selectedCertLevel]);

  const toggleFilter = (item, state, setState) => {
    if (state.includes(item)) {
      setState(state.filter(i => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  return (
    <div className="font-sans text-slate-800 bg-[#f8fafc] min-h-screen">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-2xl text-slate-800">
            <span className="text-[#3a5f8a]">Bimp</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-[#3a5f8a]">Рішення</a>
            <a href="#" className="text-[#3a5f8a]">Партнери</a>
            <a href="#" className="hover:text-[#3a5f8a]">Тарифи</a>
          </div>
          <button className="bg-[#3a5f8a] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2c4a6e] transition-colors">Стати партнером</button>
        </div>
      </nav>

      <header className="relative bg-[#0f172a] text-white overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a5f8a] via-[#1e293b] to-[#0f172a] opacity-80"></div>
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 text-xs font-semibold mb-4 backdrop-blur-sm">OFFICIAL PARTNERS</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Сертифіковані партнери Bimp</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Знайдіть надійного експерта для впровадження, налаштування та масштабування вашого бізнесу.</p>
        </div>
      </header>

      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-4 items-start">
              <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600 shrink-0"><Award size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Чому варто обирати офіційних партнерів</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Офіційні партнери мають прямий доступ до технічної підтримки Bimp, проходять регулярне навчання та володіють найактуальнішими інструментами.</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex gap-4 items-start">
              <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600 shrink-0"><Check size={24} /></div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Що означає сертифікація</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Статус партнера (Gold, Certified, Registered) відображає рівень досвіду, кількість успішних впроваджень та глибину технічної експертизи команди.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        <button onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} className="lg:hidden flex items-center justify-between w-full bg-white p-4 rounded-xl border border-slate-200 font-bold text-slate-700 shadow-sm">
          <span className="flex items-center gap-2"><Filter size={18} /> Фільтри та пошук</span>
          {isMobileFiltersOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>

        <aside className={`w-full lg:w-1/4 lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-6 text-slate-400 font-medium text-xs uppercase tracking-widest"><Filter size={14} /> Фільтрація</div>
            
            <FilterSection title="Місто">
              <div className="relative">
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm">
                  {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500"><svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg></div>
              </div>
            </FilterSection>

            <FilterSection title="Рівень сертифікації">
              <div className="space-y-2.5">
                {['Gold', 'Certified', 'Registered'].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedCertLevel.includes(level)} onChange={() => toggleFilter(level, selectedCertLevel, setSelectedCertLevel)} className="w-4 h-4 rounded border-slate-300 text-[#3a5f8a] focus:ring-[#3a5f8a]" />
                    <span className={`text-sm group-hover:text-[#3a5f8a] transition-colors ${level === 'Gold' ? 'font-bold text-yellow-700' : 'text-slate-600'}`}>{level} Partner</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Тип партнера">
              <div className="space-y-2.5">
                {['ERP інтегратор', 'Консалтинг', 'Впровадження CRM'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedPartnerTypes.includes(type)} onChange={() => toggleFilter(type, selectedPartnerTypes, setSelectedPartnerTypes)} className="w-4 h-4 rounded border-slate-300 text-[#3a5f8a] focus:ring-[#3a5f8a]" />
                    <span className="text-sm text-slate-600 group-hover:text-[#3a5f8a] transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Тип бізнесу">
              <div className="space-y-2.5">
                {['Виробництво', 'Торгівля', 'E-commerce'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedBusinessTypes.includes(type)} onChange={() => toggleFilter(type, selectedBusinessTypes, setSelectedBusinessTypes)} className="w-4 h-4 rounded border-slate-300 text-[#3a5f8a] focus:ring-[#3a5f8a]" />
                    <span className="text-sm text-slate-600 group-hover:text-[#3a5f8a] transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Галузі">
              <div className="max-h-60 overflow-y-auto pr-2 space-y-2.5 custom-scrollbar">
                 <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={selectedIndustries.length === 0} onChange={() => setSelectedIndustries([])} className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#3a5f8a] focus:ring-[#3a5f8a] shrink-0" />
                  <span className="text-sm text-slate-600 group-hover:text-[#3a5f8a] transition-colors leading-tight">Усі галузі</span>
                </label>
                {INDUSTRIES_LIST.map(ind => (
                  <label key={ind} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedIndustries.includes(ind)} onChange={() => toggleFilter(ind, selectedIndustries, setSelectedIndustries)} className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#3a5f8a] focus:ring-[#3a5f8a] shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-[#3a5f8a] transition-colors leading-tight">{ind}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <button onClick={() => { setSelectedCity("Всі міста"); setSelectedBusinessTypes([]); setSelectedIndustries([]); setSelectedPartnerTypes([]); setSelectedCertLevel([]); }} className="w-full mt-4 text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors text-center py-2">Скинути всі фільтри</button>
          </div>
        </aside>

        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a5f8a] mb-4"></div>
              <p className="text-slate-500">Завантаження партнерів...</p>
            </div>
          ) : filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPartners.map(partner => (
                <PartnerCard key={partner.id} partner={partner} onContactClick={handleContactClick} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"><Search size={32} /></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Нічого не знайдено</h3>
              <p className="text-slate-500 max-w-md mx-auto">На жаль, за вашими критеріями не знайдено жодного партнера. Спробуйте змінити фільтри або очистити їх.</p>
              <button onClick={() => { setSelectedCity("Всі міста"); setSelectedBusinessTypes([]); setSelectedIndustries([]); setSelectedPartnerTypes([]); setSelectedCertLevel([]); }} className="mt-6 text-[#3a5f8a] font-semibold hover:underline">Очистити фільтри</button>
            </div>
          )}
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} partnerName={selectedPartnerName} />

      <footer className="bg-slate-800 text-slate-400 py-12 mt-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-white">Bimp</span>
            <p className="text-sm mt-2">© 2026 Bimp. Всі права захищено.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-white transition-colors">Умови використання</a>
            <a href="#" className="hover:text-white transition-colors">Контакти</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
