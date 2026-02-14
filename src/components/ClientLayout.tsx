import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Briefcase, MessageSquare, CreditCard, LogOut, ArrowLeftRight, Menu, X, ShieldAlert, Trash2, Bell, Settings, Search, ArrowUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, useRef } from 'react';

const navItems = [
    { path: '/klient', icon: Home, label: 'Mój panel' },
    { path: '/klient/nowa-sprawa', icon: PlusCircle, label: 'Nowa sprawa' },
    { path: '/klient/sprawy', icon: Briefcase, label: 'Moje sprawy' },
    { path: '/klient/wiadomosci', icon: MessageSquare, label: 'Wiadomości' },
    { path: '/klient/platnosci', icon: CreditCard, label: 'Płatności' },
];

const pageTitles: Record<string, string> = {
    '/klient': 'Mój panel',
    '/klient/nowa-sprawa': 'Nowa sprawa',
    '/klient/sprawy': 'Moje sprawy',
    '/klient/wiadomosci': 'Wiadomości',
    '/klient/platnosci': 'Płatności',
};

export default function ClientLayout() {
    const { user, logout, switchRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const title = pageTitles[location.pathname] || 'Panel klienta';

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Wiadomość', message: 'Kancelaria Nowak przesłała nową wiadomość w Twojej sprawie.', time: '5 min temu', read: false },
        { id: 2, title: 'Termin spotkania', message: 'Masz zaplanowane spotkanie na jutro o 10:00.', time: '2 godz. temu', read: false },
        { id: 3, title: 'Uzupełnienie dokumentów', message: 'Wymagane jest przesłanie upoważnienia PDF.', time: '1 dzień temu', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const clearNotifications = () => setNotifications([]);
    const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

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

    const scrollToTop = () => {
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const switchToRole = (role: 'admin' | 'kancelaria') => {
        switchRole(role);
        navigate(role === 'admin' ? '/admin' : '/firma');
    };

    return (
        <div className={`app-layout client-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <button
                type="button"
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                aria-label="Zamknij menu"
                onClick={() => setIsSidebarOpen(false)}
            />
            
            <aside className="sidebar client-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">§</div>
                    <div><h1>Legal SaaS</h1></div>
                    <span className="logo-badge" style={{ background: 'var(--accent-gradient)' }}>KLIENT</span>
                    <button type="button" className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
                </div>
                <nav className="sidebar-nav">
                    <div className="sidebar-group">
                        <div className="sidebar-group-title">Menu klienta</div>
                        {navItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                                end={item.path === '/klient'}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>
                <div className="sidebar-footer">
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 2 }}>Zalogowany jako</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.name || 'Klient'}</div>
                </div>
            </aside>

            <div className="app-content-wrapper">
                <header className="topbar">
                    <div className="topbar-inner">
                        <div className="topbar-left">
                            <button
                                type="button"
                                className="mobile-menu-btn"
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
                                    <input placeholder="Szukaj w moich sprawach..." />
                                </div>
                            </div>

                            <button className="topbar-icon-btn" title="Ustawienia">
                                <Settings size={18} />
                            </button>

                            <div className="notif-wrapper">
                                <button className="topbar-icon-btn" title="Powiadomienia">
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
                                    {notifications.length > 0 && (
                                        <button className="notif-footer" onClick={markAllAsRead}>
                                            Oznacz jako przeczytane
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="user-profile-wrapper">
                                <div className="topbar-avatar client-avatar">
                                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'UZ'}
                                </div>
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <strong>{user?.name || 'Użytkownik'}</strong>
                                        <span>{user?.email || 'klient@legal-saas.pl'}</span>
                                        <div className="badge badge-info mt-1" style={{ fontSize: 9 }}>Konto Petenta</div>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="px-3 py-2">
                                        <p className="text-[10px] text-var(--text-tertiary) uppercase font-bold mb-1">Rodo / Giodo</p>
                                        <button className="user-dropdown-item py-1.5 opacity-80 hover:opacity-100">
                                            <ShieldAlert size={14} />
                                            Eksportuj dane
                                        </button>
                                        <button 
                                            className="user-dropdown-item py-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                                            onClick={() => {
                                                if(window.confirm('Czy na pewno chcesz złożyć wniosek o usunięcie danych? Zgodnie z RODO proces zostanie zainicjowany w ciągu 72h.')) {
                                                    alert('Wniosek o zapomnienie został wysłany do administratora.');
                                                }
                                            }}
                                        >
                                            <Trash2 size={14} />
                                            Prawo do zapomnienia
                                        </button>
                                    </div>
                                    <div className="divider"></div>
                                    {user?.role === 'admin' || user?.role === 'kancelaria' ? (
                                        <button className="user-dropdown-item" onClick={() => switchToRole('kancelaria')}>
                                            <ArrowLeftRight size={16} />
                                            Panel Firmowy
                                        </button>
                                    ) : null}
                                    <button className="user-dropdown-item text-red-400" onClick={handleLogout}>
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

            {/* Bottom nav for very small mobile screens (optional but kept for UX) */}
            <nav className="client-bottom-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/klient'}
                        className={({ isActive }) => `client-bottom-link${isActive ? ' active' : ''}`}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
