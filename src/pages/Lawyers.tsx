import { useState } from 'react';
import { Search, Plus, Star, Mail, Building2 } from 'lucide-react';
import { lawyers } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';

const statusMap: Record<string, { badge: string; label: string }> = {
    active: { badge: 'badge-success', label: 'Aktywny' },
    suspended: { badge: 'badge-error', label: 'Zawieszony' },
    verification: { badge: 'badge-warning', label: 'Weryfikacja' },
};

export default function LawyersPage() {
    const [search, setSearch] = useState('');
    const isMobile = useIsMobile();
    const filtered = lawyers.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.lawFirm.toLowerCase().includes(search.toLowerCase()));

    // Mobile card view dla prawników
    const renderLawyerCard = (l: any) => {
        const s = statusMap[l.status];
        return (
            <div key={l.id} className="responsive-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="list-item-avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                            {l.name.replace('mec. ', '').split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{l.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Mail size={12} /> {l.email}
                            </div>
                        </div>
                    </div>
                    <span className={`badge ${s.badge}`}>{s.label}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Kancelaria</div>
                        <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Building2 size={12} /> {l.lawFirm}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Sprawy</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{l.caseCount}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Ocena</div>
                        <div style={{ fontSize: 13 }}>
                            {l.rating > 0 ? <span className="rating"><Star size={13} />{l.rating}</span> : <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>–</span>}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Aktywność</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{l.activityScore}%</div>
                    </div>
                </div>
                <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>Specjalizacje</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {l.specializations.map((sp: string) => (
                            <span key={sp} className="tag">{sp}</span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Prawnicy</h2><p className="page-header-sub">{lawyers.length} prawników w systemie</p></div>
                <button className="btn btn-primary"><Plus size={15} /> Dodaj prawnika</button>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj prawnika..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>

                {/* Mobile: Card view */}
                {isMobile ? (
                    <div className="responsive-cards">
                        {filtered.map(l => renderLawyerCard(l))}
                    </div>
                ) : (
                    /* Desktop: Table view */
                    <table>
                        <thead><tr><th>Prawnik</th><th>Kancelaria</th><th>Specjalizacje</th><th>Status</th><th>Sprawy</th><th>Ocena</th><th>Aktywność</th></tr></thead>
                        <tbody>
                            {filtered.map(l => {
                                const s = statusMap[l.status];
                                return (
                                    <tr key={l.id}>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div className="list-item-avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{l.name.replace('mec. ', '').split(' ').map(n => n[0]).join('')}</div>
                                            <div><div style={{ fontWeight: 500 }}>{l.name}</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{l.email}</div></div>
                                        </div></td>
                                        <td style={{ fontSize: 13 }}>{l.lawFirm}</td>
                                        <td><div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>{l.specializations.map(sp => <span key={sp} className="tag">{sp}</span>)}</div></td>
                                        <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                                        <td style={{ fontWeight: 600 }}>{l.caseCount}</td>
                                        <td>{l.rating > 0 ? <span className="rating"><Star size={13} />{l.rating}</span> : <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>–</span>}</td>
                                        <td style={{ minWidth: 100 }}>
                                            <div style={{ fontSize: 11, marginBottom: 3, color: 'var(--text-tertiary)' }}>{l.activityScore}%</div>
                                            <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${l.activityScore}%` }}></div></div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
