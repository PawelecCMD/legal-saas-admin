import { Receipt, Send, Download, Eye } from 'lucide-react';
import { invoices } from '../../data/mockData';
import { useIsMobile } from '../../hooks/useMediaQuery';

const statusBadge: Record<string, string> = { draft: 'badge-neutral', sent: 'badge-info', 'ksef-accepted': 'badge-success', 'ksef-rejected': 'badge-error', paid: 'badge-success' };
const statusLabel: Record<string, string> = { draft: 'Szkic', sent: 'Wysłana', 'ksef-accepted': 'KSeF OK', 'ksef-rejected': 'KSeF odrzucona', paid: 'Opłacona' };

export default function FirmInvoices() {
    const isMobile = useIsMobile();

    const renderInvoiceCard = (inv: any) => (
        <div key={inv.id} className="responsive-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                    <div style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{inv.number}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{inv.lawFirm}</div>
                </div>
                <span className={`badge ${statusBadge[inv.status]}`} style={{ fontSize: 10 }}>{statusLabel[inv.status]}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>NIP</div>
                    <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{inv.nip}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Typ</div>
                    <span className="badge badge-neutral" style={{ fontSize: 11 }}>{inv.type}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Netto</div>
                    <div style={{ fontSize: 13 }}>{inv.netAmount.toLocaleString('pl-PL')} zł</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Brutto</div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{inv.grossAmount.toLocaleString('pl-PL')} zł</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>KSeF nr</div>
                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>{inv.ksefNumber || '—'}</div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-ghost btn-sm" title="Podgląd"><Eye size={14} /> Podgląd</button>
                <button className="btn btn-ghost btn-sm" title="Wyślij KSeF"><Send size={14} /> Wyślij</button>
                <button className="btn btn-ghost btn-sm" title="Pobierz PDF"><Download size={14} /> PDF</button>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Faktury i KSeF</h2>
                    <p className="page-header-sub">Zarządzanie fakturami kancelarii</p>
                </div>
                <button className="btn btn-primary"><Receipt size={15} /> Nowa faktura</button>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', marginBottom: 24 }}>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Wystawione</span></div><div className="stat-card-value">{invoices.length}</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">KSeF zaakceptowane</span></div><div className="stat-card-value" style={{ color: 'var(--success)' }}>{invoices.filter(i => i.status === 'ksef-accepted').length}</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Oczekujące</span></div><div className="stat-card-value" style={{ color: 'var(--warning)' }}>{invoices.filter(i => i.status === 'draft' || i.status === 'sent').length}</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Łączny przychód</span></div><div className="stat-card-value">{(invoices.reduce((s, i) => s + i.grossAmount, 0) / 1000).toFixed(0)}k zł</div></div>
            </div>

            <div className="data-table-wrapper">
                {isMobile ? (
                    <div className="responsive-cards">
                        {invoices.map(inv => renderInvoiceCard(inv))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>Nr faktury</th><th>Kancelaria</th><th>NIP</th><th>Netto</th><th>VAT</th><th>Brutto</th><th>Typ</th><th>Status</th><th>KSeF nr</th><th>Akcje</th></tr></thead>
                        <tbody>
                            {invoices.map(inv => (
                                <tr key={inv.id}>
                                    <td style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{inv.number}</td>
                                    <td>{inv.lawFirm}</td>
                                    <td style={{ fontSize: 12, fontFamily: 'monospace' }}>{inv.nip}</td>
                                    <td>{inv.netAmount.toLocaleString('pl-PL')} zł</td>
                                    <td>{inv.vatRate}%</td>
                                    <td style={{ fontWeight: 600 }}>{inv.grossAmount.toLocaleString('pl-PL')} zł</td>
                                    <td><span className="badge badge-neutral" style={{ fontSize: 11 }}>{inv.type}</span></td>
                                    <td><span className={`badge ${statusBadge[inv.status]}`}>{statusLabel[inv.status]}</span></td>
                                    <td style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>{inv.ksefNumber || '—'}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button className="btn btn-ghost btn-sm" title="Podgląd"><Eye size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Wyślij KSeF"><Send size={14} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Pobierz PDF"><Download size={14} /></button>
                                        </div>
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
