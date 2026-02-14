import { CreditCard, Check, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cases } from '../../data/mockData';

export default function ClientPayments() {
    const { user } = useAuth();
    const myCases = cases.filter(c => c.client === user?.name);

    const payments = myCases.map(c => ({
        id: `PAY-${c.id}`,
        caseId: c.id,
        description: c.description,
        amount: c.value,
        status: c.status === 'Zakończona' || c.status === 'Zamknięta' ? 'released' : c.status === 'Oczekuje na płatność' ? 'pending' : 'escrow',
        date: c.createdAt,
    }));

    const statusLabel: Record<string, { text: string; badge: string; icon: any }> = {
        pending: { text: 'Do zapłaty', badge: 'badge-warning', icon: Clock },
        escrow: { text: 'W depozycie', badge: 'badge-info', icon: ShieldCheck },
        released: { text: 'Zwolniony', badge: 'badge-success', icon: Check },
    };

    const totalPaid = payments.filter(p => p.status !== 'pending').reduce((s, p) => s + p.amount, 0);

    return (
        <div className="animate-in" style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
            <div className="page-header">
                <div>
                    <h2>Płatności</h2>
                    <p className="page-header-sub">Historia płatności i status escrow</p>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 32 }}>
                <div className="stat-card">
                    <div className="stat-card-header"><span className="stat-card-label">Zapłacone łącznie</span><CreditCard size={16} className="stat-card-icon" /></div>
                    <div className="stat-card-value">{totalPaid.toLocaleString('pl-PL')} zł</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header"><span className="stat-card-label">W depozycie</span><ShieldCheck size={16} className="stat-card-icon" /></div>
                    <div className="stat-card-value" style={{ color: 'var(--accent-light)' }}>{payments.filter(p => p.status === 'escrow').reduce((s, p) => s + p.amount, 0).toLocaleString('pl-PL')} zł</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-header"><span className="stat-card-label">Oczekujące</span><Clock size={16} className="stat-card-icon" /></div>
                    <div className="stat-card-value" style={{ color: 'var(--warning)' }}>{payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0).toLocaleString('pl-PL')} zł</div>
                </div>
            </div>

            <div className="card">
                <div className="card-header"><span className="card-title">Historia transakcji</span></div>
                {payments.map(p => {
                    const st = statusLabel[p.status];
                    return (
                        <div key={p.id} className="list-item" style={{ padding: '16px 20px' }}>
                            <div className="list-item-left">
                                <div className="list-item-avatar" style={{ background: p.status === 'pending' ? 'var(--warning)' : p.status === 'escrow' ? 'var(--accent)' : 'var(--success)' }}>
                                    <st.icon size={16} color="white" />
                                </div>
                                <div className="list-item-info">
                                    <h4>{p.description}</h4>
                                    <p>Sprawa {p.caseId} • {p.date}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <span className={`badge ${st.badge}`}>{st.text}</span>
                                <span style={{ fontWeight: 700, fontSize: 16, minWidth: 100, textAlign: 'right' }}>{p.amount.toLocaleString('pl-PL')} zł</span>
                                {p.status === 'pending' && <button className="btn btn-primary btn-sm">Zapłać</button>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
