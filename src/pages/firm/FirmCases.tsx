import { useState } from 'react';
import { Clock, Plus, UserPlus } from 'lucide-react';
import { cases } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useIsMobile } from '../../hooks/useMediaQuery';

const statusBadge: Record<string, string> = {
    'Nowa': 'badge-info', 'Oczekuje na płatność': 'badge-warning', 'W trakcie realizacji': 'badge-info',
    'Oczekuje na akceptację': 'badge-purple', 'Do poprawy': 'badge-warning', 'Zakończona': 'badge-success',
    'Anulowana': 'badge-error', 'Zamknięta': 'badge-neutral'
};

export default function FirmCases() {
    const { user } = useAuth();
    const [filter, setFilter] = useState('all');
    const firmCases = cases.filter(c => c.lawFirm === (user?.firmName || 'Kancelaria Nowak'));
    const filtered = filter === 'all' ? firmCases : firmCases.filter(c => c.status === filter);
    const isMobile = useIsMobile();

    const renderCaseCard = (c: any) => (
        <div key={c.id} className="responsive-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                    <div style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{c.id}</div>
                    <div style={{ fontWeight: 500 }}>{c.client}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{c.lawyer}</div>
                </div>
                <span className={`badge ${statusBadge[c.status] || 'badge-neutral'}`} style={{ fontSize: 10 }}>{c.status}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Typ</div>
                    <span className="badge badge-neutral" style={{ fontSize: 11 }}>{c.type}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Wartość</div>
                    <div style={{ fontWeight: 600 }}>{c.value.toLocaleString('pl-PL')} zł</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Termin</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {c.deadline}</div>
                </div>
            </div>
            <div style={{ marginTop: 12 }}>
                <button className="btn btn-ghost btn-sm" title="Przypisz prawnika"><UserPlus size={14} /> Przypisz</button>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Zarządzanie sprawami</h2>
                    <p className="page-header-sub">{firmCases.length} spraw w kancelarii</p>
                </div>
                <button className="btn btn-primary"><Plus size={15} /> Dodaj sprawę</button>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                {['all', 'Nowa', 'W trakcie realizacji', 'Oczekuje na płatność', 'Zakończona'].map(s => (
                    <button key={s} className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setFilter(s)}>
                        {s === 'all' ? 'Wszystkie' : s}
                    </button>
                ))}
            </div>

            <div className="data-table-wrapper">
                {isMobile ? (
                    <div className="responsive-cards">
                        {filtered.map(c => renderCaseCard(c))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>ID</th><th>Klient</th><th>Prawnik</th><th>Typ</th><th>Status</th><th>Wartość</th><th>Termin</th><th>Akcje</th></tr></thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{c.id}</td>
                                    <td style={{ fontWeight: 500 }}>{c.client}</td>
                                    <td style={{ fontSize: 13 }}>{c.lawyer}</td>
                                    <td><span className="badge badge-neutral" style={{ fontSize: 11 }}>{c.type}</span></td>
                                    <td><span className={`badge ${statusBadge[c.status] || 'badge-neutral'}`}>{c.status}</span></td>
                                    <td style={{ fontWeight: 600 }}>{c.value.toLocaleString('pl-PL')} zł</td>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}><Clock size={11} /> {c.deadline}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm" title="Przypisz prawnika"><UserPlus size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
