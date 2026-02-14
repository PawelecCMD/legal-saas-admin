import { Clock, Filter } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { cases } from '../../data/mockData';

const statusBadge: Record<string, string> = {
    'Nowa': 'badge-info', 'Oczekuje na płatność': 'badge-warning', 'W trakcie realizacji': 'badge-info',
    'Oczekuje na akceptację': 'badge-purple', 'Do poprawy': 'badge-warning', 'Zakończona': 'badge-success',
    'Anulowana': 'badge-error', 'Zamknięta': 'badge-neutral'
};

export default function ClientCases() {
    const { user } = useAuth();
    const [filter, setFilter] = useState<string>('all');
    const myCases = cases.filter(c => c.client === user?.name);
    const filtered = filter === 'all' ? myCases : myCases.filter(c => c.status === filter);

    return (
        <div className="animate-in" style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>
            <div className="page-header">
                <div>
                    <h2>Moje sprawy</h2>
                    <p className="page-header-sub">{myCases.length} spraw łącznie</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                <button className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter('all')}>
                    <Filter size={13} /> Wszystkie
                </button>
                {['W trakcie realizacji', 'Oczekuje na płatność', 'Zakończona'].map(s => (
                    <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(s)}>
                        {s}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)' }}>
                    Brak spraw w wybranej kategorii.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {filtered.map(c => (
                        <div key={c.id} className="card" style={{ padding: '20px 24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                <div>
                                    <div style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600, marginBottom: 4 }}>{c.id}</div>
                                    <h4 style={{ margin: 0, fontSize: 16 }}>{c.description}</h4>
                                </div>
                                <span className={`badge ${statusBadge[c.status] || 'badge-neutral'}`}>{c.status}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'var(--text-tertiary)' }}>
                                <span>Kancelaria: <strong style={{ color: 'var(--text-secondary)' }}>{c.lawFirm}</strong></span>
                                <span>Prawnik: <strong style={{ color: 'var(--text-secondary)' }}>{c.lawyer}</strong></span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Clock size={12} /> Termin: {c.deadline}
                                </span>
                                <span>Wartość: <strong style={{ color: 'var(--text-primary)' }}>{c.value.toLocaleString('pl-PL')} zł</strong></span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
