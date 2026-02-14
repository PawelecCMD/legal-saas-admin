import { invoices } from '../data/mockData';
import { Download, Send, FileCheck, AlertTriangle } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

const statusMap: Record<string, { badge: string; label: string }> = {
    draft: { badge: 'badge-neutral', label: 'Szkic' },
    sent: { badge: 'badge-info', label: 'Wysłana' },
    'ksef-accepted': { badge: 'badge-success', label: 'KSeF ✓' },
    'ksef-rejected': { badge: 'badge-error', label: 'KSeF ✗' },
    paid: { badge: 'badge-success', label: 'Opłacona' },
};

export default function InvoicesPage() {
    const isMobile = useIsMobile();

    const renderInvoiceCard = (inv: any) => {
        const s = statusMap[inv.status];
        return (
            <div key={inv.id} className="responsive-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div>
                        <div style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{inv.number}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{inv.type} • {inv.issuedAt}</div>
                    </div>
                    <span className={`badge ${s.badge}`} style={{ fontSize: 10 }}>{s.label}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Kancelaria</div>
                        <div style={{ fontSize: 13 }}>{inv.lawFirm}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>NIP</div>
                        <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{inv.nip}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Netto</div>
                        <div style={{ fontSize: 13 }}>{inv.netAmount.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Brutto</div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{inv.grossAmount.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>KSeF nr</div>
                        <div style={{ fontSize: 11, fontFamily: 'monospace', color: inv.ksefNumber ? 'var(--success)' : 'var(--text-tertiary)' }}>{inv.ksefNumber || '—'}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="btn btn-ghost btn-sm" title="Pobierz PDF"><Download size={13} /> PDF</button>
                    {inv.status === 'ksef-rejected' && (
                        <button className="btn btn-ghost btn-sm" title="Szczegóły błędu" style={{ color: 'var(--error)' }}><AlertTriangle size={13} /> Błąd</button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Faktury / KSeF</h2><p className="page-header-sub">System fakturowania z integracją KSeF</p></div>
                <div className="page-header-actions">
                    <button className="btn btn-secondary"><FileCheck size={15} /> Konfiguracja KSeF</button>
                    <button className="btn btn-primary"><Send size={15} /> Nowa faktura</button>
                </div>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', marginBottom: 24 }}>
                <div className="stat-card"><div className="stat-card-label">Wystawione</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8 }}>{invoices.length}</div></div>
                <div className="stat-card"><div className="stat-card-label">KSeF zaakceptowane</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8, color: 'var(--success)' }}>{invoices.filter(i => i.status === 'ksef-accepted').length}</div></div>
                <div className="stat-card"><div className="stat-card-label">KSeF odrzucone</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8, color: 'var(--error)' }}>{invoices.filter(i => i.status === 'ksef-rejected').length}</div></div>
                <div className="stat-card"><div className="stat-card-label">Suma brutto</div><div className="stat-card-value" style={{ fontSize: 22, marginTop: 8 }}>{invoices.reduce((s, i) => s + i.grossAmount, 0).toLocaleString('pl-PL')} zł</div></div>
            </div>
            <div className="data-table-wrapper">
                {isMobile ? (
                    <div className="responsive-cards">
                        {invoices.map(inv => renderInvoiceCard(inv))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>Numer</th><th>Typ</th><th>Kancelaria</th><th>NIP</th><th>Netto</th><th>VAT</th><th>Brutto</th><th>Status</th><th>KSeF nr</th><th>Data</th><th></th></tr></thead>
                        <tbody>
                            {invoices.map(inv => {
                                const s = statusMap[inv.status];
                                return (
                                    <tr key={inv.id}>
                                        <td style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{inv.number}</td>
                                        <td><span className="tag">{inv.type}</span></td>
                                        <td style={{ fontSize: 13 }}>{inv.lawFirm}</td>
                                        <td style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{inv.nip}</td>
                                        <td>{inv.netAmount.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł</td>
                                        <td>{inv.vatRate}%</td>
                                        <td style={{ fontWeight: 700 }}>{inv.grossAmount.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł</td>
                                        <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                                        <td style={{ fontSize: 11, fontFamily: 'monospace', color: inv.ksefNumber ? 'var(--success)' : 'var(--text-tertiary)' }}>{inv.ksefNumber || '—'}</td>
                                        <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{inv.issuedAt}</td>
                                        <td><div style={{ display: 'flex', gap: 4 }}>
                                            <button className="btn btn-ghost btn-sm" title="Pobierz PDF"><Download size={13} /></button>
                                            {inv.status === 'ksef-rejected' && <button className="btn btn-ghost btn-sm" title="Szczegóły błędu" style={{ color: 'var(--error)' }}><AlertTriangle size={13} /></button>}
                                        </div></td>
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
