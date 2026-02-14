import { Briefcase, Clock, MessageSquare, CreditCard, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cases } from '../../data/mockData';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function ClientDashboard() {
    const { user } = useAuth();
    const isMobile = useIsMobile();
    const myCases = cases.filter(c => c.client === user?.name).slice(0, 3);
    const activeCases = cases.filter(c => c.client === user?.name && !['Zakończona', 'Zamknięta', 'Anulowana'].includes(c.status));

    return (
        <div className="animate-in px-4 py-6 md:px-6 md:py-8 max-w-4xl mx-auto">
            <div className="page-header">
                <div>
                    <h2>Witaj, {user?.name?.split(' ')[0]} 👋</h2>
                    <p className="page-header-sub">Twój przegląd spraw prawnych</p>
                </div>
                <Link to="/klient/nowa-sprawa" className="btn btn-primary">
                    + Nowa sprawa <ArrowRight size={16} />
                </Link>
            </div>

            {/* Stats grid - responsive */}
            <div className={`grid gap-x-4 gap-y-0 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                <div className="stat-card">
                    <div className="stat-card-header"><span className="stat-card-label">Aktywne sprawy</span><Briefcase size={16} className="stat-card-icon" /></div>
                    <div className="stat-card-value">{activeCases.length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header"><span className="stat-card-label">Wiadomości</span><MessageSquare size={16} className="stat-card-icon" /></div>
                    <div className="stat-card-value">3</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header"><span className="stat-card-label">Wydatki łącznie</span><CreditCard size={16} className="stat-card-icon" /></div>
                    <div className="stat-card-value">{cases.filter(c => c.client === user?.name).reduce((s, c) => s + c.value, 0).toLocaleString('pl-PL')} zł</div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <span className="card-title">Ostatnie sprawy</span>
                    <Link to="/klient/sprawy" className="btn btn-ghost btn-sm">Zobacz wszystkie <ArrowRight size={13} /></Link>
                </div>
                {myCases.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                        <Briefcase size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                        <p>Nie masz jeszcze żadnych spraw.</p>
                        <Link to="/klient/nowa-sprawa" className="btn btn-primary" style={{ marginTop: 12 }}>Utwórz pierwszą sprawę</Link>
                    </div>
                ) : (
                    myCases.map(c => (
                        <div key={c.id} className="list-item">
                            <div className="list-item-left">
                                <div className="list-item-avatar" style={{ background: 'var(--accent)', fontSize: 11 }}>{c.id.slice(-3)}</div>
                                <div className="list-item-info">
                                    <h4>{c.description}</h4>
                                    <p><Clock size={11} /> {c.deadline} • {c.lawFirm}</p>
                                </div>
                            </div>
                            <span className="badge badge-info">{c.status}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
