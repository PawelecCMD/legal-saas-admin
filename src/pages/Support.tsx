import { tickets } from '../data/mockData';
import { MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

const statusMap: Record<string, { badge: string; label: string }> = {
    open: { badge: 'badge-info', label: 'Otwarty' },
    'in-progress': { badge: 'badge-warning', label: 'W toku' },
    resolved: { badge: 'badge-success', label: 'Rozwiązany' },
    closed: { badge: 'badge-neutral', label: 'Zamknięty' },
};
const prioMap: Record<string, { badge: string }> = {
    low: { badge: 'badge-neutral' }, medium: { badge: 'badge-info' },
    high: { badge: 'badge-warning' }, critical: { badge: 'badge-error' },
};

export default function SupportPage() {
    const isMobile = useIsMobile();

    const renderTicketCard = (t: any) => (
        <div key={t.id} className="responsive-card" style={{ background: t.priority === 'critical' ? 'rgba(239,68,68,0.04)' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                    <div style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{t.id}</div>
                    <div style={{ fontWeight: 500 }}>{t.subject}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t.lawFirm}</div>
                </div>
                <span className={`badge ${prioMap[t.priority].badge}`} style={{ fontSize: 10 }}>
                    {t.priority === 'critical' ? <><AlertCircle size={11} /> krytyczny</> : t.priority === 'high' ? 'wysoki' : t.priority === 'medium' ? 'średni' : 'niski'}
                </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Status</div>
                    <span className={`badge ${statusMap[t.status].badge}`} style={{ fontSize: 11 }}>{statusMap[t.status].label}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Wiadomości</div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><MessageSquare size={12} /> {t.messages}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Utworzono</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.createdAt}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Aktualizacja</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{t.updatedAt}</span></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Wsparcie i zgłoszenia</h2><p className="page-header-sub">Zgłoszenia od kancelarii – {tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length} aktywne</p></div>
            </div>
            <div className="data-table-wrapper">
                {isMobile ? (
                    <div className="responsive-cards">
                        {tickets.map(t => renderTicketCard(t))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>ID</th><th>Temat</th><th>Kancelaria</th><th>Priorytet</th><th>Status</th><th>Wiadomości</th><th>Utworzono</th><th>Aktualizacja</th></tr></thead>
                        <tbody>
                            {tickets.map(t => (
                                <tr key={t.id} style={{ background: t.priority === 'critical' ? 'rgba(239,68,68,0.04)' : undefined }}>
                                    <td style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{t.id}</td>
                                    <td style={{ fontWeight: 500 }}>{t.subject}</td>
                                    <td style={{ fontSize: 13 }}>{t.lawFirm}</td>
                                    <td><span className={`badge ${prioMap[t.priority].badge}`}>{t.priority === 'critical' ? <><AlertCircle size={11} /> krytyczny</> : t.priority === 'high' ? 'wysoki' : t.priority === 'medium' ? 'średni' : 'niski'}</span></td>
                                    <td><span className={`badge ${statusMap[t.status].badge}`}>{statusMap[t.status].label}</span></td>
                                    <td><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageSquare size={13} /> {t.messages}</span></td>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t.createdAt}</td>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} />{t.updatedAt}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
