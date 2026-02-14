import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, Shield, Building2, Scale, Briefcase, FileText,
    CreditCard, Package, Tag, Brain, BarChart3, Newspaper, ClipboardList,
    Lock, Settings, HeadphonesIcon, Cookie, Database, ServerCog, Receipt,
    BookOpen, ChevronRight, ArrowLeftRight, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Konfiguracja nawigacji bocznej - grupy menu
 * Mobile: Wyświetlane jako lista rozwijana
 * Desktop: Wyświetlane jako rozwinięte grupy
 */
const navGroups = [
    {
        title: 'Główne',
        items: [
            { path: '/admin', icon: LayoutDashboard, label: 'Panel główny' },
        ]
    },
    {
        title: 'Zarządzanie',
        items: [
            { path: '/admin/users', icon: Users, label: 'Użytkownicy' },
            { path: '/admin/roles', icon: Shield, label: 'Role i RBAC' },
            { path: '/admin/law-firms', icon: Building2, label: 'Kancelarie' },
            { path: '/admin/lawyers', icon: Scale, label: 'Prawnicy' },
            { path: '/admin/cases', icon: Briefcase, label: 'Sprawy' },
            { path: '/admin/documents', icon: FileText, label: 'Dokumenty' },
        ]
    },
    {
        title: 'Finanse',
        items: [
            { path: '/admin/payments', icon: CreditCard, label: 'Płatności' },
            { path: '/admin/invoices', icon: Receipt, label: 'Faktury / KSeF' },
            { path: '/admin/plans', icon: Package, label: 'Plany' },
            { path: '/admin/promotions', icon: Tag, label: 'Promocje' },
        ]
    },
    {
        title: 'AI & Wiedza',
        items: [
            { path: '/admin/ai-center', icon: Brain, label: 'Centrum AI' },
            { path: '/admin/legal-knowledge', icon: BookOpen, label: 'Baza prawa' },
        ]
    },
    {
        title: 'System',
        items: [
            { path: '/admin/analytics', icon: BarChart3, label: 'Analityka' },
            { path: '/admin/audit-log', icon: ClipboardList, label: 'Dziennik zmian' },
            { path: '/admin/security', icon: Lock, label: 'Bezpieczeństwo' },
            { path: '/admin/config', icon: Settings, label: 'Konfiguracja' },
            { path: '/admin/backups', icon: Database, label: 'Kopie zapasowe' },
            { path: '/admin/logs', icon: ServerCog, label: 'Logi systemowe' },
            { path: '/admin/cookies', icon: Cookie, label: 'Cookies' },
        ]
    },
    {
        title: 'Inne',
        items: [
            { path: '/admin/support', icon: HeadphonesIcon, label: 'Wsparcie' },
            { path: '/admin/cms', icon: Newspaper, label: 'CMS' },
        ]
    }
];

/**
 * Props dla komponentu Sidebar
 * @param onClose - Funkcja zamykająca sidebar (używana na mobile)
 */
interface SidebarProps {
    onClose?: () => void;
}

/**
 * Sidebar nawigacji - responsywny panel boczny
 * 
 * Breakpoints:
 * - Mobile (< 1024px): Sidebar wysuwa się z lewej strony jako overlay
 * - Desktop (>= 1024px): Statyczny panel boczny
 * 
 * Stylizacja:
 * - Min. height przycisków: 44px (iOS HIG)
 * - Padding: 12px 14px dla linków
 * - Ikony: 18px
 */
export default function Sidebar({ onClose }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { switchRole } = useAuth();

    return (
        <aside className="sidebar">
            {/* Logo z identyfikatorem roli */}
            <div className="sidebar-logo">
                <div className="logo-icon">§</div>
                <div>
                    <h1>Legal SaaS</h1>
                </div>
                <span className="logo-badge">ADMIN</span>
                
                {/* Mobile Close Button */}
                <button 
                    type="button" 
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Zamknij menu"
                >
                    <X size={20} />
                </button>
            </div>
            
            {/* Nawigacja - grupy menu */}
            <nav className="sidebar-nav">
                {navGroups.map((group) => (
                    <div key={group.title} className="sidebar-group">
                        {/* Tytuł grupy - ukryty na bardzo małych ekranach */}
                        <div className="sidebar-group-title hidden xs:block">
                            {group.title}
                        </div>
                        
                        {/* Linki nawigacyjne */}
                        {group.items.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    // Aktywny stan: jaśniejsze tło, accent kolor
                                    `sidebar-link${isActive && (item.path === '/admin' ? location.pathname === '/admin' : true) ? ' active' : ''}`
                                }
                                end={item.path === '/admin'}
                                onClick={onClose}
                                aria-label={item.label}
                            >
                                {/* Ikona - 18px, shrink-0 aby nie zmieniała rozmiaru */}
                                <item.icon className="shrink-0" style={{ width: 18, height: 18 }} />
                                {/* Etykieta - widoczna na desktop, ukryta na mobile w zależności od implementacji */}
                                <span className="truncate">{item.label}</span>
                                {/* Ikona wskazująca dla niektórych linków */}
                                {(item.path === '/admin/support') && (
                                    <ChevronRight 
                                        style={{ marginLeft: 'auto', width: 14, height: 14, opacity: 0.3 }} 
                                        aria-hidden="true"
                                    />
                                )}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>
            
            {/* Przyciski zmiany roli - stopka sidebar */}
            {/* Mobile: Większe przyciski dla łatwiejszego dotykania */}
            <div 
                className="flex gap-2 px-4 py-3 border-t border-(--border-secondary)"
                style={{ borderTop: '1px solid var(--border-secondary)' }}
            >
                {/* Przycisk przejścia do panelu kancelarii */}
                <button 
                    className="btn btn-ghost btn-sm flex-1 text-xs min-h-11"
                    style={{ flex: 1, fontSize: 11, minHeight: 44 }}
                    onClick={() => { 
                        onClose?.(); 
                        switchRole('kancelaria'); 
                        navigate('/firma'); 
                    }}
                    aria-label="Przejdź do panelu kancelarii"
                >
                    <ArrowLeftRight size={12} aria-hidden="true" />
                    <span className="hidden sm:inline">Firma</span>
                    <span className="sm:hidden">Firma</span>
                </button>
                
                {/* Przycisk przejścia do panelu klienta */}
                <button 
                    className="btn btn-ghost btn-sm flex-1 text-xs min-h-11"
                    style={{ flex: 1, fontSize: 11, minHeight: 44 }}
                    onClick={() => { 
                        onClose?.(); 
                        switchRole('klient'); 
                        navigate('/klient'); 
                    }}
                    aria-label="Przejdź do panelu klienta"
                >
                    <ArrowLeftRight size={12} aria-hidden="true" />
                    <span className="hidden sm:inline">Klient</span>
                    <span className="sm:hidden">Klient</span>
                </button>
            </div>
        </aside>
    );
}
