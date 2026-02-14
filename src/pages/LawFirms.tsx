import { useState } from 'react';
import { Search, Plus, ExternalLink, Building2, Globe } from 'lucide-react';
import { lawFirms } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';

const statusMap: Record<string, { badge: string; label: string; dot: string }> = {
    active: { badge: 'badge-success', label: 'Aktywna', dot: 'green' },
    trial: { badge: 'badge-warning', label: 'Okres próbny', dot: 'yellow' },
    suspended: { badge: 'badge-error', label: 'Zawieszona', dot: 'red' },
    expired: { badge: 'badge-neutral', label: 'Wygasła', dot: 'gray' },
};

export default function LawFirmsPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const isMobile = useIsMobile();
    const filtered = lawFirms.filter(f => {
        const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || f.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Mobile card view dla kancelarii
    const renderFirmCard = (f: any) => {
        const s = statusMap[f.status];
        const aiPct = f.aiLimit > 0 ? Math.round((f.aiUsage / f.aiLimit) * 100) : 0;
        const aiBarClass = aiPct > 90 ? 'danger' : aiPct > 70 ? 'warning' : '';

        return (
            <div key={f.id} className="responsive-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="list-item-avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                            <Building2 size={20} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{f.billingOwner}</div>
                        </div>
                    </div>
                    <span className={`badge ${s.badge}`}><span className={`badge-dot ${s.dot}`}></span>{s.label}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Plan</div>
                        <span className="badge badge-purple" style={{ fontSize: 11 }}>{f.plan}</span>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Prawnicy</div>
                        <div style={{ fontSize: 13 }}>{f.lawyerCount} / {f.lawyerLimit}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Klienci</div>
                        <div style={{ fontSize: 13 }}>{f.clientCount}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>MRR</div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{f.mrr > 0 ? `${f.mrr.toLocaleString('pl-PL')} zł` : '—'}</div>
                    </div>
                </div>
                <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-secondary)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>Użycie AI</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontSize: 12 }}>{f.aiUsage.toLocaleString()} / {f.aiLimit.toLocaleString()}</div>
                        <div style={{ flex: 1 }}>
                            <div className="progress-bar"><div className={`progress-bar-fill ${aiBarClass}`} style={{ width: `${Math.min(aiPct, 100)}%` }}></div></div>
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{aiPct}%</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                    {f.domain ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--accent-light)' }}>
                            <Globe size={14} /> {f.domain}
                        </span>
                    ) : (
                        <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>Brak domeny</span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Kancelarie</h2><p className="page-header-sub">Multi-tenant – zarządzanie {lawFirms.length} kancelariami</p></div>
                <button className="btn btn-primary"><Plus size={15} /> Dodaj kancelarię</button>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj kancelarii..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                    <div className="data-table-filters">
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="all">Wszystkie statusy</option>
                            <option value="active">Aktywne</option>
                            <option value="trial">Okres próbny</option>
                            <option value="suspended">Zawieszone</option>
                            <option value="expired">Wygasłe</option>
                        </select>
                    </div>
                </div>

                {/* Mobile: Card view */}
                {isMobile ? (
                    <div className="responsive-cards">
                        {filtered.map(f => renderFirmCard(f))}
                    </div>
                ) : (
                    /* Desktop: Table view */
                    <table>
                        <thead><tr><th>Kancelaria</th><th>Status</th><th>Plan</th><th>Prawnicy</th><th>Klienci</th><th>Użycie AI</th><th>MRR</th><th>Domena</th></tr></thead>
                        <tbody>
                            {filtered.map(f => {
                                const s = statusMap[f.status];
                                const aiPct = f.aiLimit > 0 ? Math.round((f.aiUsage / f.aiLimit) * 100) : 0;
                                const aiBarClass = aiPct > 90 ? 'danger' : aiPct > 70 ? 'warning' : '';
                                return (
                                    <tr key={f.id}>
                                        <td><div style={{ fontWeight: 500 }}>{f.name}</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Właściciel: {f.billingOwner}</div></td>
                                        <td><span className={`badge ${s.badge}`}><span className={`badge-dot ${s.dot}`}></span>{s.label}</span></td>
                                        <td><span className="badge badge-purple">{f.plan}</span></td>
                                        <td>{f.lawyerCount} / {f.lawyerLimit}</td>
                                        <td>{f.clientCount}</td>
                                        <td style={{ minWidth: 130 }}>
                                            <div style={{ fontSize: 12, marginBottom: 3 }}>{f.aiUsage.toLocaleString()} / {f.aiLimit.toLocaleString()}</div>
                                            <div className="progress-bar"><div className={`progress-bar-fill ${aiBarClass}`} style={{ width: `${Math.min(aiPct, 100)}%` }}></div></div>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{f.mrr > 0 ? `${f.mrr.toLocaleString('pl-PL')} zł` : '—'}</td>
                                        <td>{f.domain ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--accent-light)' }}><ExternalLink size={12} />{f.domain}</span> : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}</td>
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
