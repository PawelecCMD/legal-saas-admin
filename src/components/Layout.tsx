import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Settings, LogOut, ExternalLink, Menu, X, ArrowUp } from 'lucide-react';
import { useGlobalSearch } from '../hooks/useGlobalSearch';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Mapa tytułów stron dla nagłówka
 * Automatycznie dopasowuje tytuł na podstawie ścieżki URL
 */
const pageTitles: Record<string, string> = {
    '/admin': 'Panel główny',
    '/admin/users': 'Użytkownicy',
    '/admin/roles': 'Role i uprawnienia',
    '/admin/law-firms': 'Kancelarie',
    '/admin/lawyers': 'Prawnicy',
    '/admin/cases': 'Sprawy',
    '/admin/documents': 'Dokumenty',
    '/admin/payments': 'Płatności i Escrow',
    '/admin/invoices': 'Faktury / KSeF',
    '/admin/plans': 'Plany i produkty',
    '/admin/promotions': 'Promocje',
    '/admin/ai-center': 'Centrum AI',
    '/admin/legal-knowledge': 'Baza prawa',
    '/admin/analytics': 'Analityka i raporty',
    '/admin/audit-log': 'Dziennik zmian',
    '/admin/security': 'Bezpieczeństwo',
    '/admin/config': 'Konfiguracja systemu',
    '/admin/backups': 'Kopie zapasowe',
    '/admin/logs': 'Logi systemowe',
    '/admin/cookies': 'Zarządzanie cookies',
    '/admin/support': 'Wsparcie i zgłoszenia',
    '/admin/cms': 'CMS i marketing',
};

/**
 * Główny layout panelu administratora
 * 
 * Struktura:
 * - Mobile: Sidebar jako overlay wysuwany z lewej strony
 * - Desktop: Sidebar jako statyczny panel boczny
 * 
 * Breakpoints:
 * - xs-sm (< 640px): Pełnoekranowy sidebar overlay
 * - md-lg (640px-1023px): Sidebar z ciemnym tłem
 * - xl+ (>= 1024px): Statyczny sidebar
 */
export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const title = pageTitles[location.pathname] || 'Panel admina';
    const { query, setQuery, results } = useGlobalSearch();
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Nowa sprawa', message: 'Kancelaria Nowak dodała nową sprawę SP012', time: '2 min temu', read: false },
        { id: 2, title: 'Płatność otrzymana', message: 'Otrzymano płatność za fakturę FV/2026/02/01', time: '1 godz. temu', read: false },
        { id: 3, title: 'Alert systemu', message: 'Zużycie AI przekroczyło 80% limitu w Kancelarii LEX', time: '3 godz. temu', read: true },
    ]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const clearNotifications = () => {
        setNotifications([]);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                setShowScrollTop(contentRef.current.scrollTop > 300);
            }
        };
        const el = contentRef.current;
        el?.addEventListener('scroll', handleScroll);
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isSidebarOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isSidebarOpen]);

    const scrollToTop = () => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={`app-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <button
                type="button"
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                aria-label="Zamknij menu"
                onClick={() => setIsSidebarOpen(false)}
            />
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
            <div className="app-content-wrapper">
                <header className="topbar">
                    <div className="topbar-inner">
                        <div className="topbar-left">
                            <button
                                type="button"
                                className="mobile-menu-btn"
                                aria-label={isSidebarOpen ? 'Zamknij menu' : 'Otwórz menu'}
                                aria-expanded={isSidebarOpen}
                                onClick={() => setIsSidebarOpen((prev) => !prev)}
                            >
                                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                            <h1 className="topbar-title">{title}</h1>
                        </div>
                        <div className="topbar-right">
                            <div className="topbar-search-wrapper">
                                <div className="topbar-search">
                                    <Search size={15} />
                                    <input
                                        placeholder="Szukaj (min. 2 znaki)..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                                {results.length > 0 && (
                                    <div className="search-results-overlay">
                                        {results.map((r) => (
                                            <Link
                                                key={`${r.type}-${r.id}`}
                                                to={r.link}
                                                className="search-result-item"
                                                onClick={() => setQuery('')}
                                            >
                                                <div className="res-icon">
                                                    <ExternalLink size={14} />
                                                </div>
                                                <div className="res-info">
                                                    <div className="res-title">{r.title}</div>
                                                    <div className="res-type">{r.type} • {r.subtitle}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="topbar-icon-btn" title="Ustawienia">
                                <Settings size={18} />
                            </button>
                            <div className="notif-wrapper">
                                <button 
                                    className="topbar-icon-btn" 
                                    title="Powiadomienia"
                                >
                                    <Bell size={18} />
                                    {unreadCount > 0 && <span className="notif-badge"></span>}
                                </button>
                                <div className="notif-dropdown">
                                    <div className="notif-header">
                                        <span>Powiadomienia ({notifications.length})</span>
                                        <button onClick={clearNotifications}>Wyczyść</button>
                                    </div>
                                    <div className="notif-list">
                                        {notifications.length === 0 ? (
                                            <div className="notif-empty">Brak powiadomień</div>
                                        ) : (
                                            notifications.map(n => (
                                                <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                                                    <div className="notif-item-header">
                                                        <strong>{n.title}</strong>
                                                        <span>{n.time}</span>
                                                    </div>
                                                    <p>{n.message}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {notifications.length > 0 ? (
                                        <div className="flex flex-col">
                                            <button className="notif-footer" onClick={markAllAsRead}>
                                                Oznacz jako przeczytane
                                            </button>
                                            <Link to="/admin/audit-log" className="notif-footer text-center border-t border-white/5" style={{ textAlign: 'center' }}>
                                                Zobacz wszystkie zdarzenia
                                            </Link>
                                        </div>
                                    ) : (
                                        <Link to="/admin/audit-log" className="notif-footer text-center" style={{ textAlign: 'center' }}>
                                            Przejdź do dziennika zmian
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="user-profile-wrapper">
                                <div
                                    className="topbar-avatar"
                                    title={user?.name || 'Admin'}
                                >
                                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'JK'}
                                </div>
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <strong>{user?.name || 'Jan Kowalski'}</strong>
                                        <span>{user?.email || 'jan@admin.pl'}</span>
                                    </div>
                                    <div className="divider"></div>
                                    <button className="user-dropdown-item" onClick={handleLogout}>
                                        <LogOut size={16} />
                                        Wyloguj się
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="app-content" ref={contentRef}>
                    <div className="page-shell">
                        <Outlet />
                    </div>
                </main>
                {showScrollTop && (
                    <button className="scroll-top-btn animate-in" onClick={scrollToTop}>
                        <ArrowUp size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
