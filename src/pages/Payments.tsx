import { useState } from 'react';
import { Search, RefreshCw, Eye, CheckCircle, Download, CreditCard, ShieldCheck, X } from 'lucide-react';
import { payments as initialPayments } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';

const statusMap: Record<string, { badge: string; label: string }> = {
    pending: { badge: 'badge-warning', label: 'Oczekująca' },
    paid: { badge: 'badge-success', label: 'Opłacona' },
    escrow: { badge: 'badge-info', label: 'Escrow' },
    released: { badge: 'badge-success', label: 'Wypłacona' },
    refunded: { badge: 'badge-error', label: 'Zwrot' },
};

export default function PaymentsPage() {
    const [pays, setPays] = useState(initialPayments);
    const [search, setSearch] = useState('');
    const [selectedPay, setSelectedPay] = useState<any>(null);
    const [filter, setFilter] = useState('all');
    const isMobile = useIsMobile();

    const filtered = pays.filter(p => {
        const matchesSearch = p.client.toLowerCase().includes(search.toLowerCase()) || p.caseId.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || p.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleAction = (id: string, newStatus: any) => {
        setPays(pays.map(p => p.id === id ? { ...p, status: newStatus } : p));
        setSelectedPay(null);
    };

    const renderPaymentCard = (p: any) => {
        const s = statusMap[p.status];
        return (
            <div key={p.id} className="responsive-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div>
                        <div style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{p.caseId}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.id}</div>
                    </div>
                    <span className={`badge ${s.badge}`} style={{ fontSize: 10 }}>{s.label}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Klient</div>
                        <div style={{ fontSize: 13 }}>{p.client}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Kancelaria</div>
                        <div style={{ fontSize: 13 }}>{p.lawFirm}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Kwota</div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{p.amount.toLocaleString('pl-PL')} zł</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Metoda</div>
                        <div style={{ fontSize: 13 }}><span className="tag">{p.method}</span></div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Data</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.createdAt}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedPay(p)}><Eye size={13} /> Szczegóły</button>
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Płatności i Escrow</h2><p className="page-header-sub">Zarządzanie płatnościami, escrow i zwrotami</p></div>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-label">Łączne płatności</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8 }}>48 500 zł</div></div>
                <div className="stat-card"><div className="stat-card-label">W escrow</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8, color: 'var(--info)' }}>7 500 zł</div></div>
                <div className="stat-card"><div className="stat-card-label">Wypłacone</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8, color: 'var(--success)' }}>35 000 zł</div></div>
                <div className="stat-card"><div className="stat-card-label">Zwroty</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8, color: 'var(--error)' }}>2 000 zł</div></div>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj płatności..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {['all', 'paid', 'escrow', 'pending'].map(f => (
                            <button key={f} className={`btn btn-xs ${filter === f ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setFilter(f)}>
                                {f === 'all' ? 'Wszystkie' : f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {isMobile ? (
                    <div className="responsive-cards">
                        {filtered.map(p => renderPaymentCard(p))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>ID</th><th>Sprawa</th><th>Klient</th><th>Kancelaria</th><th>Kwota</th><th>Status</th><th>Metoda</th><th>Data</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(p => {
                                const s = statusMap[p.status];
                                return (
                                    <tr key={p.id}>
                                        <td style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-tertiary)' }}>{p.id}</td>
                                        <td style={{ color: 'var(--accent-light)', fontWeight: 500 }}>{p.caseId}</td>
                                        <td>{p.client}</td>
                                        <td style={{ fontSize: 13 }}>{p.lawFirm}</td>
                                        <td style={{ fontWeight: 700 }}>{p.amount.toLocaleString('pl-PL')} zł</td>
                                        <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                                        <td><span className="tag">{p.method}</span></td>
                                        <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.createdAt}</td>
                                        <td><button className="btn btn-ghost btn-sm" onClick={() => setSelectedPay(p)}><Eye size={13} /></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedPay && (
                <div className="modal-overlay">
                    <div className="modal" style={{ maxWidth: 500 }}>
                        <div className="modal-header">
                            <h3 className="modal-title">Szczegóły płatności {selectedPay.id}</h3>
                            <button className="modal-close" onClick={() => setSelectedPay(null)}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div className="card" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-secondary)', marginBottom: 20 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Kwota</span>
                                    <span style={{ fontSize: 18, fontWeight: 700 }}>{selectedPay.amount.toLocaleString('pl-PL')} zł</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Status</span>
                                    <span className={`badge ${statusMap[selectedPay.status].badge}`}>{statusMap[selectedPay.status].label}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Metoda</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}><CreditCard size={14} /> {selectedPay.method}</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Szczegóły Escrow</label>
                                <div style={{ background: 'rgba(99,102,241,0.05)', padding: 12, borderRadius: 8, marginTop: 8, border: '1px solid rgba(99,102,241,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--accent-light)', fontWeight: 600 }}>
                                        <ShieldCheck size={16} /> Środki zabezpieczone
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Środki zostały zablokowane na koncie technicznym i zostaną zwolnione po zakończeniu sprawy lub akceptacji dokumentacji.</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {selectedPay.status === 'escrow' && (
                                    <button className="btn btn-primary" style={{ gap: 8 }} onClick={() => handleAction(selectedPay.id, 'released')}>
                                        <CheckCircle size={16} /> Zwolnij Escrow
                                    </button>
                                )}
                                {(selectedPay.status === 'paid' || selectedPay.status === 'escrow') && (
                                    <button className="btn btn-error" style={{ gap: 8 }} onClick={() => handleAction(selectedPay.id, 'refunded')}>
                                        <RefreshCw size={16} /> Dokonaj zwrotu
                                    </button>
                                )}
                                <button className="btn btn-secondary" style={{ gap: 8, gridColumn: selectedPay.status === 'released' || selectedPay.status === 'refunded' ? 'span 2' : 'auto' }}>
                                    <Download size={16} /> Pobierz potwierdzenie
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
