import { systemLogs } from '../data/mockData';
import { Search, Cpu, HardDrive, Activity, Clock } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

const levelStyles: Record<string, { badge: string }> = {
    info: { badge: 'badge-info' }, warn: { badge: 'badge-warning' },
    error: { badge: 'badge-error' }, critical: { badge: 'badge-error' },
};

export default function SystemLogsPage() {
    const isMobile = useIsMobile();

    const renderLogCard = (l: any) => (
        <div key={l.id} className="responsive-card" style={{ background: l.level === 'critical' ? 'rgba(239,68,68,0.04)' : undefined }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>{l.timestamp}</div>
                    <div style={{ fontWeight: 600 }}>{l.source}</div>
                </div>
                <span className={`badge ${levelStyles[l.level].badge}`} style={{ fontSize: 10 }}>{l.level.toUpperCase()}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Źródło</div>
                    <span className="tag">{l.source}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Poziom</div>
                    <span className={`badge ${levelStyles[l.level].badge}`} style={{ fontSize: 11 }}>{l.level.toUpperCase()}</span>
                </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-secondary)' }}>{l.message}</div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Logi systemowe</h2><p className="page-header-sub">Logi aplikacji, serwera i API</p></div>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">CPU</span><Cpu size={16} className="stat-card-icon" /></div><div className="stat-card-value">23%</div><div className="progress-bar" style={{ marginTop: 8 }}><div className="progress-bar-fill" style={{ width: '23%' }}></div></div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">RAM</span><HardDrive size={16} className="stat-card-icon" /></div><div className="stat-card-value">4.2 GB</div><div className="progress-bar" style={{ marginTop: 8 }}><div className="progress-bar-fill warning" style={{ width: '52%' }}></div></div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">API uptime</span><Activity size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ color: 'var(--success)' }}>99.97%</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Śr. czas odp.</span><Clock size={16} className="stat-card-icon" /></div><div className="stat-card-value">124ms</div></div>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj w logach..." /></div>
                    <div className="data-table-filters">
                        <select><option>Wszystkie poziomy</option><option value="info">Informacja</option><option value="warn">Ostrzeżenie</option><option value="error">Błąd</option><option value="critical">Krytyczny</option></select>
                        <select><option>Wszystkie źródła</option><option value="AI Service">Usługa AI</option><option value="Auth">Autoryzacja</option><option value="Payment">Płatności</option><option value="Database">Baza danych</option><option value="KSeF">KSeF</option></select>
                    </div>
                </div>

                {isMobile ? (
                    <div className="responsive-cards">
                        {systemLogs.map(l => renderLogCard(l))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>Czas</th><th>Poziom</th><th>Źródło</th><th>Komunikat</th></tr></thead>
                        <tbody>
                            {systemLogs.map(l => (
                                <tr key={l.id} style={{ background: l.level === 'critical' ? 'rgba(239,68,68,0.04)' : undefined }}>
                                    <td style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{l.timestamp}</td>
                                    <td><span className={`badge ${levelStyles[l.level].badge}`}>{l.level.toUpperCase()}</span></td>
                                    <td><span className="tag">{l.source}</span></td>
                                    <td style={{ fontSize: 13, maxWidth: 400 }}>{l.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
