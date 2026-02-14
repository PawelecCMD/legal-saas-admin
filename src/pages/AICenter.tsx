import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Brain, Zap, AlertTriangle, Settings, X } from 'lucide-react';
import { aiUsageData } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';

const providers = [
    { name: 'GPT-4o', status: 'active', queries: 4200, avgTime: '1.8s', cost: '$42.10' },
    { name: 'DeepSeek V3', status: 'fallback', queries: 1890, avgTime: '2.1s', cost: '$9.45' },
    { name: 'Grok-3', status: 'inactive', queries: 0, avgTime: '—', cost: '$0' },
    { name: 'Claude 3.5', status: 'inactive', queries: 0, avgTime: '—', cost: '$0' },
];

const ragLogs = [
    { query: 'art. 286 kk – oszustwo', chunks: 8, confidence: 0.94, time: '340ms', model: 'GPT-4o' },
    { query: 'odwołanie od wypowiedzenia art. 45 kp', chunks: 6, confidence: 0.87, time: '280ms', model: 'GPT-4o' },
    { query: 'podział majątku po rozwodzie', chunks: 12, confidence: 0.91, time: '520ms', model: 'DeepSeek V3' },
    { query: 'art. 156 kk – ciężki uszczerbek', chunks: 5, confidence: 0.42, time: '190ms', model: 'GPT-4o' },
    { query: 'sprzeciw od nakazu zapłaty kpc', chunks: 7, confidence: 0.89, time: '310ms', model: 'GPT-4o' },
];

export default function AICenterPage() {
    const [tab, setTab] = useState<'overview' | 'providers' | 'rag'>('overview');
    const [selectedLog, setSelectedLog] = useState<any>(null);
    const [activeProviders, setActiveProviders] = useState(['GPT-4o', 'DeepSeek V3']);
    const isMobile = useIsMobile();

    const toggleProvider = (name: string) => {
        if (activeProviders.includes(name)) {
            setActiveProviders(activeProviders.filter(p => p !== name));
        } else {
            setActiveProviders([...activeProviders, name]);
        }
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Centrum AI</h2><p className="page-header-sub">Monitoring, konfiguracja providerów, logi RAG</p></div>
                <div className="page-header-actions">
                    <select className="select-sm" style={{ padding: '6px 12px', fontSize: 13 }}>
                        <option>Domyślny model: GPT-4o</option>
                        <option>Domyślny model: Claude 3.5</option>
                    </select>
                </div>
            </div>
            <div className="tabs">
                <button className={`tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Przegląd</button>
                <button className={`tab ${tab === 'providers' ? 'active' : ''}`} onClick={() => setTab('providers')}>Providerzy</button>
                <button className={`tab ${tab === 'rag' ? 'active' : ''}`} onClick={() => setTab('rag')}>Log RAG</button>
            </div>

            {tab === 'overview' && <>
                <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Zapytania AI (luty)</span><Brain size={16} className="stat-card-icon" /></div><div className="stat-card-value">7,800</div></div>
                    <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Tokeny zużyte</span><Zap size={16} className="stat-card-icon" /></div><div className="stat-card-value">1.69M</div></div>
                    <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Koszt miesięczny</span><Settings size={16} className="stat-card-icon" /></div><div className="stat-card-value">$51.55</div></div>
                    <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Niska pewność</span><AlertTriangle size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ color: 'var(--warning)' }}>12</div></div>
                </div>
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header"><span className="card-title">Zapytania AI – 6 miesięcy</span></div>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={aiUsageData}>
                                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12 }} />
                                <Bar dataKey="queries" fill="#6366f1" radius={[4, 4, 0, 0]} name="Zapytania" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="card">
                        <div className="card-header"><span className="card-title">Tokeny – 6 miesięcy</span></div>
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={aiUsageData}>
                                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                                <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12 }} />
                                <Line type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} name="Tokeny" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </>}

            {tab === 'providers' && (
                <div className="grid-2">
                    {providers.map(p => (
                        <div key={p.name} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>{p.name}</h3>
                                    <span className={`badge ${activeProviders.includes(p.name) ? 'badge-success' : 'badge-neutral'}`}>
                                        {activeProviders.includes(p.name) ? 'Aktywny' : 'Nieaktywny'}
                                    </span>
                                </div>
                                <div
                                    className={`toggle ${activeProviders.includes(p.name) ? 'active' : ''}`}
                                    onClick={() => toggleProvider(p.name)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="toggle-handle"></div>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Zapytania</div><div style={{ fontSize: 18, fontWeight: 700 }}>{p.queries.toLocaleString()}</div></div>
                                <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Śr. czas</div><div style={{ fontSize: 18, fontWeight: 700 }}>{p.avgTime}</div></div>
                                <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Koszt</div><div style={{ fontSize: 18, fontWeight: 700 }}>{p.cost}</div></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {tab === 'rag' && (
                <div className="data-table-wrapper">
                    {isMobile ? (
                        <div className="responsive-cards">
                            {ragLogs.map((r, i) => (
                                <div key={i} className="responsive-card">
                                    <div style={{ fontWeight: 600, marginBottom: 6 }}>{r.query}</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                                        <div>
                                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Chunki</div>
                                            <div style={{ fontSize: 13 }}>{r.chunks}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Pewność</div>
                                            <span className={`badge ${r.confidence >= 0.8 ? 'badge-success' : r.confidence >= 0.6 ? 'badge-warning' : 'badge-error'}`} style={{ fontSize: 11 }}>{(r.confidence * 100).toFixed(0)}%</span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Czas</div>
                                            <div style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.time}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Model</div>
                                            <span className="tag">{r.model}</span>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 12 }}>
                                        <button className="btn btn-ghost btn-sm" onClick={() => setSelectedLog(r)}>
                                            Źródła
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <table>
                            <thead><tr><th>Zapytanie</th><th>Chunki</th><th>Pewność</th><th>Czas</th><th>Model</th><th></th></tr></thead>
                            <tbody>
                                {ragLogs.map((r, i) => (
                                    <tr key={i}>
                                        <td style={{ maxWidth: 300 }}>{r.query}</td>
                                        <td>{r.chunks}</td>
                                        <td><span className={`badge ${r.confidence >= 0.8 ? 'badge-success' : r.confidence >= 0.6 ? 'badge-warning' : 'badge-error'}`}>{(r.confidence * 100).toFixed(0)}%</span></td>
                                        <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.time}</td>
                                        <td><span className="tag">{r.model}</span></td>
                                        <td>
                                            <button
                                                className="btn btn-ghost btn-xs"
                                                onClick={() => setSelectedLog(r)}
                                            >
                                                Źródła
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {selectedLog && (
                <div className="modal-overlay">
                    <div className="modal" style={{ maxWidth: 600 }}>
                        <div className="modal-header">
                            <h3 className="modal-title">Szczegóły zapytania RAG</h3>
                            <button className="modal-close" onClick={() => setSelectedLog(null)}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Zapytanie</label>
                                <p style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{selectedLog.query}</p>
                            </div>
                            <div style={{ background: 'var(--bg-primary)', padding: 16, borderRadius: 8, border: '1px solid var(--border-secondary)' }}>
                                <label style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Odnalezione źródła (chunks)</label>
                                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', borderLeft: '2px solid var(--accent)', paddingLeft: 12 }}>
                                            Fragment dokumentu {selectedLog.query.includes('kk') ? 'Kodeks Karny' : 'Kodeks Pracy'} - Strona {i + 5}...
                                            <p style={{ marginTop: 4, fontStyle: 'italic', fontSize: 11 }}>"...treść fragmentu tekstu prawnego odnalezionego przez wektorową bazę danych dla podanego zapytania..."</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedLog(null)}>Zamknij</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
