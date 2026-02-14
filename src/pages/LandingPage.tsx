import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  Brain,
  Check,
  ChevronUp,
  CircleX,
  FileStack,
  Gavel,
  Landmark,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

type AuthTab = 'login' | 'register' | 'recover';

const solutionCards = [
  {
    icon: Landmark,
    title: 'Kancelarie Enterprise',
    description:
      'Zarządzanie portfelem spraw, zespołami i SLA z kontrolą kosztów AI oraz dostępem do audytu operacji.',
  },
  {
    icon: Gavel,
    title: 'Kancelarie Procesowe',
    description:
      'Szybkie generowanie pism, analiza ryzyk procesowych i centralizacja komunikacji z klientami w jednym panelu.',
  },
  {
    icon: ShieldCheck,
    title: 'Działy Compliance',
    description:
      'Monitoring zmian prawa, workflow akceptacji i pełna historia decyzji dla wymogów regulacyjnych.',
  },
];

const featureCards = [
  {
    icon: Brain,
    title: 'RAG + Baza prawa',
    description:
      'Wyszukiwanie semantyczne przepisów i orzeczeń z przypisaniem źródeł oraz scoringiem trafności odpowiedzi.',
  },
  {
    icon: FileStack,
    title: 'Generator pism AI',
    description:
      'Automatyczne szkice pozwów, odpowiedzi i opinii prawnych z wersjonowaniem oraz kontrolą zmian.',
  },
  {
    icon: Lock,
    title: 'Escrow i płatności',
    description:
      'Bezpieczny przepływ rozliczeń klient-kancelaria z mechanizmem akceptacji usługi i historią transakcji.',
  },
  {
    icon: TrendingUp,
    title: 'Panel analityczny',
    description:
      'Wgląd w KPI kancelarii: czas obsługi spraw, skuteczność zespołu, koszty AI i konwersje leadów.',
  },
  {
    icon: ShieldCheck,
    title: 'Security by design',
    description:
      'Role i uprawnienia, logi audytowe, resety haseł, backupy i ścieżki zatwierdzania krytycznych operacji.',
  },
  {
    icon: Bot,
    title: '3 panele użytkownika',
    description:
      'Dedykowane doświadczenie dla Admina, Kancelarii i Klienta z tym samym modelem danych i uprawnień.',
  },
];

const metricCards = [
  { value: '85%', label: 'Krótszy czas researchu' },
  { value: '99.9%', label: 'Stabilność usług SaaS' },
  { value: '10x', label: 'Szybsze przygotowanie dokumentów' },
];

const testimonialCards = [
  {
    initials: 'AK',
    author: 'Anna Kowalska',
    role: 'Managing Partner, Kancelaria AK',
    quote:
      'Po wdrożeniu platformy skróciliśmy czas przygotowania pierwszej wersji pisma z dni do godzin. Największa wartość to porządek procesów i pełna kontrola jakości.',
  },
  {
    initials: 'MN',
    author: 'Michał Nowak',
    role: 'Head of Legal Ops, FinReg Group',
    quote:
      'Dashboard i logi audytowe dały nam transparentność, której brakowało w poprzednich narzędziach. Wdrożenie było szybkie i bezpieczne dla zespołu.',
  },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDrawer = (tab: AuthTab) => {
    setActiveTab(tab);
    setDrawerOpen(true);
  };

  return (
    <div className="cyber-page">
      {showLoader && (
        <div className="cyber-loader">
          <div className="cyber-loader-content">
            <div className="cyber-loader-logo">
              <Sparkles size={16} />
            </div>
            <div className="cyber-loader-bar">
              <div className="cyber-loader-progress" />
            </div>
            <span>Inicjalizacja węzła Legal AI...</span>
          </div>
        </div>
      )}

      <div className="cyber-mesh" />

      <button
        type="button"
        className={`cyber-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-label="Zamknij panel autoryzacji"
      />

      <aside className={`cyber-auth-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="cyber-auth-header">
          <div className="cyber-brand-mini">
            <div className="cyber-brand-icon"><Sparkles size={14} /></div>
            <span>LEGAL NODE</span>
          </div>
          <button type="button" className="cyber-icon-btn" onClick={() => setDrawerOpen(false)}>
            <CircleX size={18} />
          </button>
        </div>

        <div className="cyber-auth-steps">
          <button type="button" className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>Logowanie</button>
          <button type="button" className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>Rejestracja</button>
          <button type="button" className={activeTab === 'recover' ? 'active' : ''} onClick={() => setActiveTab('recover')}>Odzyskiwanie</button>
        </div>

        <div className="cyber-auth-body">
          {activeTab === 'login' && (
            <div>
              <p className="cyber-auth-kicker">Account Journey / 01</p>
              <h3>Witaj ponownie</h3>
              <p className="cyber-auth-copy">Zaloguj się, aby wrócić do panelu administracyjnego i zarządzać platformą Legal SaaS.</p>

              <label className="cyber-label">Email służbowy</label>
              <input className="cyber-input" type="email" placeholder="admin@legal-saas.pl" />

              <label className="cyber-label">Hasło</label>
              <input className="cyber-input" type="password" placeholder="••••••••" />

              <div className="cyber-auth-actions">
                <Link to="/login" className="cyber-btn cyber-btn-primary">Przejdź do logowania</Link>
                <button type="button" className="cyber-link-btn" onClick={() => setActiveTab('recover')}>Nie pamiętasz hasła?</button>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <p className="cyber-auth-kicker">Account Journey / 02</p>
              <h3>Utwórz konto</h3>
              <p className="cyber-auth-copy">Skonfiguruj konto organizacji i rozpocznij pracę z modułami AI, RAG, płatności i workflow.</p>

              <label className="cyber-label">Nazwa użytkownika</label>
              <input className="cyber-input" type="text" placeholder="Jan Kowalski" />

              <label className="cyber-label">Email</label>
              <input className="cyber-input" type="email" placeholder="jan@kancelaria.pl" />

              <label className="cyber-label">Hasło</label>
              <input className="cyber-input" type="password" placeholder="••••••••" />

              <div className="cyber-auth-actions">
                <Link to="/rejestracja" className="cyber-btn cyber-btn-primary">Otwórz formularz rejestracji</Link>
              </div>
            </div>
          )}

          {activeTab === 'recover' && (
            <div>
              <p className="cyber-auth-kicker">Account Journey / 03</p>
              <h3>Odzyskaj dostęp</h3>
              <p className="cyber-auth-copy">Uruchom bezpieczny proces resetu hasła i wróć do pracy bez utraty danych operacyjnych.</p>

              <label className="cyber-label">Email konta</label>
              <input className="cyber-input" type="email" placeholder="admin@legal-saas.pl" />

              <div className="cyber-auth-actions">
                <Link to="/reset-hasla" className="cyber-btn cyber-btn-primary">Przejdź do resetu hasła</Link>
                <button type="button" className="cyber-link-btn" onClick={() => setActiveTab('login')}>Powrót do logowania</button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <nav className="cyber-nav">
        <div className="cyber-brand">
          <div className="cyber-brand-icon"><Sparkles size={14} /></div>
          <span>Legal SaaS</span>
        </div>

        <div className="cyber-nav-links">
          <a href="#solutions">Rozwiązania</a>
          <a href="#metrics">Efekty</a>
          <a href="#security">Bezpieczeństwo</a>
          <button type="button" className="cyber-icon-btn" onClick={() => openDrawer('login')}>
            <Lock size={16} />
          </button>
          <button type="button" className="cyber-btn cyber-btn-primary" onClick={() => openDrawer('register')}>
            Zacznij teraz
          </button>
        </div>
      </nav>

      <header className="cyber-hero">
        <div className="cyber-badge">v2.0 Legal Intelligence Stack</div>
        <h1>
          Platforma Legal SaaS
          <span> dla kancelarii nowej generacji</span>
        </h1>
        <p>
          Jeden ekosystem dla AI, RAG, escrow, KSeF, backupów i logów systemowych.
          Zaprojektowany dla skalowalnej pracy zespołów prawnych.
        </p>
        <div className="cyber-hero-actions">
          <button type="button" className="cyber-btn cyber-btn-primary" onClick={() => openDrawer('register')}>
            Uruchom onboarding <ArrowRight size={16} />
          </button>
          <Link to="/login" className="cyber-btn cyber-btn-secondary">Wejdź do panelu admina</Link>
        </div>
      </header>

      <section className="cyber-marquee" aria-label="Zaufali nam">
        <div className="cyber-marquee-track">
          <span><Zap size={14} /> Kancelaria Lex Prime</span>
          <span><Zap size={14} /> FinReg Legal Group</span>
          <span><Zap size={14} /> Ordo & Partners</span>
          <span><Zap size={14} /> Kancelaria Nova</span>
          <span><Zap size={14} /> Legal Operations Hub</span>
          <span><Zap size={14} /> Kancelaria Lex Prime</span>
          <span><Zap size={14} /> FinReg Legal Group</span>
          <span><Zap size={14} /> Ordo & Partners</span>
          <span><Zap size={14} /> Kancelaria Nova</span>
          <span><Zap size={14} /> Legal Operations Hub</span>
        </div>
      </section>

      <section id="solutions" className="cyber-section">
        <div className="cyber-section-head">
          <p>Deployment vectors</p>
          <h2>Rozwiązania dopasowane do skali</h2>
          <span>Architektura gotowa od małego zespołu do struktur enterprise.</span>
        </div>
        <div className="cyber-grid-3">
          {solutionCards.map((card) => (
            <article key={card.title} className="cyber-card">
              <div className="cyber-card-icon"><card.icon size={24} /></div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="metrics" className="cyber-section cyber-metrics-section">
        <div className="cyber-grid-3">
          {metricCards.map((metric) => (
            <article key={metric.label} className="cyber-metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cyber-section">
        <div className="cyber-section-head center">
          <p>Core intelligence</p>
          <h2>Moduły platformy Legal SaaS</h2>
        </div>
        <div className="cyber-grid-3">
          {featureCards.map((card) => (
            <article key={card.title} className="cyber-card neon-hover">
              <div className="cyber-card-icon"><card.icon size={24} /></div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cyber-section cyber-testimonials">
        <div className="cyber-section-head center">
          <p>Proven performance</p>
          <h2>Opinie zespołów prawnych</h2>
        </div>
        <div className="cyber-grid-2">
          {testimonialCards.map((item) => (
            <article key={item.author} className="cyber-quote-card">
              <div className="cyber-quote-meta">
                <div className="cyber-avatar">{item.initials}</div>
                <div>
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
              <p>{item.quote}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="security" className="cyber-section">
        <div className="cyber-section-head">
          <p>Compliance & trust</p>
          <h2>Standardy bezpieczeństwa i jakości</h2>
          <span>Przygotowane pod wymogi audytowe i ciągłość działania aplikacji produkcyjnej.</span>
        </div>
        <div className="cyber-compliance-grid">
          <div className="cyber-chip"><Check size={14} /> RBAC i logi audytowe</div>
          <div className="cyber-chip"><Check size={14} /> Backupy i odtwarzanie</div>
          <div className="cyber-chip"><Check size={14} /> Monitorowanie usług</div>
          <div className="cyber-chip"><Check size={14} /> Workflow akceptacji zmian</div>
        </div>
      </section>

      <footer className="cyber-footer">
        <div className="cyber-footer-grid">
          <div>
            <div className="cyber-brand">
              <div className="cyber-brand-icon"><Sparkles size={14} /></div>
              <span>Legal SaaS</span>
            </div>
            <p>Platforma do zarządzania obsługą prawną: AI, RAG, płatności escrow, KSeF, logi i backupy.</p>
          </div>
          <div>
            <h4>Platforma</h4>
            <a href="#solutions">Rozwiązania</a>
            <a href="#metrics">Efekty</a>
            <a href="#security">Bezpieczeństwo</a>
          </div>
          <div>
            <h4>Dostęp</h4>
            <Link to="/login">Logowanie</Link>
            <Link to="/rejestracja">Rejestracja</Link>
            <Link to="/reset-hasla">Reset hasła</Link>
          </div>
          <div>
            <h4>Kontakt</h4>
            <a href="mailto:kontakt@legal-saas.pl">kontakt@legal-saas.pl</a>
            <a href="tel:+48221234567">+48 22 123 45 67</a>
          </div>
        </div>
        <div className="cyber-footer-bottom">
          <span>© 2026 Legal SaaS Admin. All rights reserved.</span>
        </div>
      </footer>

      <aside className="cyber-cookie-panel">
        <div className="cyber-cookie-left">
          <h3>Preferencje cookies</h3>
          <p>Używamy plików cookies do bezpieczeństwa sesji, wydajności i analityki jakości usług.</p>
        </div>
        <div className="cyber-cookie-actions">
          <button type="button" className="cyber-btn cyber-btn-primary">Akceptuj wszystkie</button>
          <button type="button" className="cyber-btn cyber-btn-secondary">Odrzuć wszystkie</button>
        </div>
      </aside>

      <button
        type="button"
        className={`scroll-to-top ${showTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}
