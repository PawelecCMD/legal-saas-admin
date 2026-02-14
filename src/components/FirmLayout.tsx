import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Scale, Brain, FileText, Receipt, Calendar, LogOut, ArrowLeftRight, Search, Bell, Settings, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const firmNavItems = [
    { path: '/firma', icon: LayoutDashboard, label: 'Panel kancelarii' },
    { path: '/firma/sprawy', icon: Briefcase, label: 'Sprawy' },
    { path: '/firma/prawnicy', icon: Scale, label: 'Prawnicy' },
    { path: '/firma/generator-ai', icon: Brain, label: 'Generator AI' },
    { path: '/firma/szablony', icon: FileText, label: 'Szablony' },
    { path: '/firma/faktury', icon: Receipt, label: 'Faktury' },
    { path: '/firma/kalendarz', icon: Calendar, label: 'Kalendarz' },
];

const pageTitles: Record<string, string> = {
    '/firma': 'Panel kancelarii',
    '/firma/sprawy': 'Zarządzanie sprawami',
    '/firma/prawnicy': 'Prawnicy',
    '/firma/generator-ai': 'Generator pism AI',
    '/firma/szablony': 'Szablony dokumentów',
    '/firma/faktury': 'Faktury i KSeF',
    '/firma/kalendarz': 'Kalendarz spraw',
};

export default function FirmLayout() {
    const { user, logout, switchRole } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'Panel kancelarii';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Nowe zadanie', message: 'Mecenas Nowak przypisał Cię do sprawy SP/2026/05', time: '10 min temu', read: false },
        { id: 2, title: 'Wiadomość od klienta', message: 'Jan Kowalski wysłał nową wiadomość w sprawie SP/2026/01', time: '1 godz. temu', read: false },
        { id: 3, title: 'Faktura opłacona', message: 'Faktura FV/2026/01 została opłacona przez klienta.', time: '5 godz. temu', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const clearNotifications = () => setNotifications([]);
    const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const switchToRole = (role: 'admin' | 'klient') => {
        switchRole(role);
        navigate(role === 'admin' ? '/admin' : '/klient');
    };

    return (
        <div className={`app-layout firm-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <button
                type="button"
                className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
                aria-label="Zamknij menu"
                onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="sidebar firm-sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">§</div>
                    <div>
                        <h1>Legal SaaS</h1>
                    </div>
                    <span className="logo-badge" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>FIRMA</span>
                </div>
                <nav className="sidebar-nav">
                    <div className="sidebar-group">
                        <div className="sidebar-group-title">Nawigacja</div>
                        {firmNavItems.map(item => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `sidebar-link${isActive && (item.path === '/firma' ? location.pathname === '/firma' : true) ? ' active' : ''}`
                                }
                                end={item.path === '/firma'}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>
                <div className="sidebar-footer">
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>Kancelaria</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{user?.firmName || 'Kancelaria'}</div>
                </div>
            </aside>
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
                                <div className="topbar-search firm-search">
                                    <Search size={15} />
                                    <input placeholder="Szukaj spraw..." />
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
                                <div
                                    className="topbar-avatar firm-avatar"
                                    title={user?.name || 'Kancelaria'}
                                >
                                    {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'RK'}
                                </div>
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <strong>{user?.name || 'Kancelaria'}</strong>
                                        <span>{user?.email || 'biuro@kancelaria.pl'}</span>
                                    </div>
                                    <div className="divider"></div>
                                    <button className="user-dropdown-item" onClick={() => switchToRole('admin')}>
                                        <ArrowLeftRight size={16} />
                                        Panel admina
                                    </button>
                                    <button className="user-dropdown-item" onClick={() => switchToRole('klient')}>
                                        <ArrowLeftRight size={16} />
                                        Panel klienta
                                    </button>
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
                <main className="app-content">
                    <div className="page-shell">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
