import { Search, Download } from 'lucide-react';
import { auditLog } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';

const actionColors: Record<string, string> = {
    CREATE: 'badge-success', UPDATE: 'badge-info', DELETE: 'badge-error',
    BACKUP: 'badge-neutral', AI_QUERY: 'badge-purple', PAYMENT: 'badge-warning',
};

export default function AuditLogPage() {
    const isMobile = useIsMobile();

    const renderAuditCard = (a: any) => (
        <div key={a.id} className="responsive-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{a.timestamp}</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.user}</div>
                </div>
                <span className={`badge ${actionColors[a.action] || 'badge-neutral'}`} style={{ fontSize: 10 }}>{a.action}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Cel</div>
                    <div style={{ fontSize: 13 }}>{a.target}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>IP</div>
                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{a.ip}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Przed</div>
                    <div style={{ fontSize: 12, color: a.before ? 'var(--error)' : 'var(--text-tertiary)' }}>{a.before || '—'}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Po</div>
                    <div style={{ fontSize: 12, color: a.after ? 'var(--success)' : 'var(--text-tertiary)' }}>{a.after || '—'}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Dziennik zmian</h2><p className="page-header-sub">Historia zmian w systemie – kto, co, kiedy</p></div>
                <button className="btn btn-secondary"><Download size={15} /> Eksport CSV</button>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj w logach..." /></div>
                    <div className="data-table-filters">
                        <select><option>Wszystkie akcje</option><option value="CREATE">Tworzenie</option><option value="UPDATE">Aktualizacja</option><option value="DELETE">Usuwanie</option><option value="BACKUP">Backup</option><option value="AI_QUERY">Zapytanie AI</option></select>
                    </div>
                </div>

                {isMobile ? (
                    <div className="responsive-cards">
                        {auditLog.map(a => renderAuditCard(a))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>Czas</th><th>Użytkownik</th><th>Akcja</th><th>Cel</th><th>Przed</th><th>Po</th><th>IP</th></tr></thead>
                        <tbody>
                            {auditLog.map(a => (
                                <tr key={a.id}>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{a.timestamp}</td>
                                    <td style={{ fontWeight: 500 }}>{a.user}</td>
                                    <td><span className={`badge ${actionColors[a.action] || 'badge-neutral'}`}>{a.action}</span></td>
                                    <td style={{ fontSize: 13 }}>{a.target}</td>
                                    <td style={{ fontSize: 12, color: a.before ? 'var(--error)' : 'var(--text-tertiary)' }}>{a.before || '—'}</td>
                                    <td style={{ fontSize: 12, color: a.after ? 'var(--success)' : 'var(--text-tertiary)' }}>{a.after || '—'}</td>
                                    <td style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>{a.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
