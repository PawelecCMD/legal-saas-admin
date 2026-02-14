import { backups } from '../data/mockData';
import { Database, Download, RefreshCw, Trash2, HardDrive, Play } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function BackupsPage() {
    const isMobile = useIsMobile();

    const renderBackupCard = (b: any) => (
        <div key={b.id} className="responsive-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                <div>
                    <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>{b.createdAt}</div>
                    <div style={{ fontWeight: 600 }}>{b.size}</div>
                </div>
                <span className={`badge ${b.status === 'completed' ? 'badge-success' : b.status === 'in-progress' ? 'badge-warning' : 'badge-error'}`} style={{ fontSize: 10 }}>
                    {b.status === 'completed' ? 'Ukończony' : b.status === 'in-progress' ? 'W toku...' : 'Błąd'}
                </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Typ</div>
                    <span className={`badge ${b.type === 'full' ? 'badge-info' : 'badge-neutral'}`} style={{ fontSize: 11 }}>{b.type === 'full' ? 'Pełny' : 'Przyrostowy'}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Szyfrowanie</div>
                    <div style={{ fontSize: 13 }}>{b.encrypted ? '🔒' : '—'}</div>
                </div>
            </div>
            <div style={{ marginTop: 12 }}>
                <button className="btn btn-ghost btn-sm"><Download size={13} /> Pobierz</button>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Kopie zapasowe</h2><p className="page-header-sub">Zarządzanie kopiami zapasowymi i optymalizacja bazy</p></div>
                <button className="btn btn-primary"><Play size={15} /> Wykonaj backup</button>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Rozmiar bazy</span><Database size={16} className="stat-card-icon" /></div><div className="stat-card-value">8.7 GB</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Ostatni pełny</span><HardDrive size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ fontSize: 18 }}>2026-02-09</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Łączna wielkość</span><HardDrive size={16} className="stat-card-icon" /></div><div className="stat-card-value">9.4 GB</div></div>
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-header"><span className="card-title">Historia kopii zapasowych</span></div>
                    {isMobile ? (
                        <div className="responsive-cards">
                            {backups.map(b => renderBackupCard(b))}
                        </div>
                    ) : (
                        <table>
                            <thead><tr><th>Data</th><th>Typ</th><th>Rozmiar</th><th>Status</th><th>Szyfrowanie</th><th></th></tr></thead>
                            <tbody>
                                {backups.map(b => (
                                    <tr key={b.id}>
                                        <td style={{ fontSize: 12, fontFamily: 'monospace' }}>{b.createdAt}</td>
                                        <td><span className={`badge ${b.type === 'full' ? 'badge-info' : 'badge-neutral'}`}>{b.type === 'full' ? 'Pełny' : 'Przyrostowy'}</span></td>
                                        <td>{b.size}</td>
                                        <td><span className={`badge ${b.status === 'completed' ? 'badge-success' : b.status === 'in-progress' ? 'badge-warning' : 'badge-error'}`}>{b.status === 'completed' ? 'Ukończony' : b.status === 'in-progress' ? 'W toku...' : 'Błąd'}</span></td>
                                        <td>{b.encrypted ? '🔒' : '—'}</td>
                                        <td><button className="btn btn-ghost btn-sm"><Download size={13} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title">Optymalizacja i czyszczenie</span></div>
                    {[
                        { label: 'Wyczyść nieaktywne sesje', count: '1,247 sesji', icon: Trash2 },
                        { label: 'Usuń wygasłe tokeny', count: '3,891 tokenów', icon: Trash2 },
                        { label: 'Wyczyść logi > 90 dni', count: '12,456 wpisów', icon: Trash2 },
                        { label: 'Optymalizuj indeksy', count: '12 tabel', icon: RefreshCw },
                        { label: 'Usuń soft-deleted > 30 dni', count: '89 rekordów', icon: Trash2 },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border-secondary)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <item.icon size={16} style={{ color: 'var(--text-tertiary)' }} />
                                <div><div style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.count}</div></div>
                            </div>
                            <button className="btn btn-secondary btn-sm">Wykonaj</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
