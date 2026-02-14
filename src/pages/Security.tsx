import { Shield, Lock, Globe, AlertTriangle, Key, Smartphone } from 'lucide-react';

const policies = [
    { label: 'Wymuszenie 2FA dla kancelarii', enabled: true },
    { label: 'MFA dla administratorów', enabled: true },
    { label: 'Minimalna długość hasła: 12 znaków', enabled: true },
    { label: 'Wymóg znaku specjalnego', enabled: true },
    { label: 'Wymóg cyfry w haśle', enabled: true },
    { label: 'Blokada po 5 nieudanych logowaniach', enabled: true },
    { label: 'Wygasanie hasła co 90 dni', enabled: false },
    { label: 'Wykrywanie podejrzanych logowań', enabled: true },
];

const blockedIPs = ['103.152.220.44', '185.220.101.1', '23.129.64.100', '198.98.56.0/24'];

export default function SecurityPage() {
    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Bezpieczeństwo</h2><p className="page-header-sub">Zarządzanie politykami bezpieczeństwa i dostępem</p></div>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Aktywne sesje</span><Globe size={16} className="stat-card-icon" /></div><div className="stat-card-value">247</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">2FA włączone</span><Smartphone size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ color: 'var(--success)' }}>89%</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Zablokowane IP</span><Lock size={16} className="stat-card-icon" /></div><div className="stat-card-value">{blockedIPs.length}</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Alerty bezp. (7d)</span><AlertTriangle size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ color: 'var(--warning)' }}>3</div></div>
            </div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-header"><span className="card-title"><Shield size={16} style={{ marginRight: 8 }} />Polityka haseł i 2FA</span></div>
                    {policies.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < policies.length - 1 ? '1px solid var(--border-secondary)' : 'none' }}>
                            <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>{p.label}</span>
                            <div className={`toggle ${p.enabled ? 'active' : ''}`}></div>
                        </div>
                    ))}
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><Lock size={16} style={{ marginRight: 8 }} />Zablokowane IP</span><button className="btn btn-secondary btn-sm">+ Dodaj IP</button></div>
                    {blockedIPs.map(ip => (
                        <div key={ip} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-secondary)' }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{ip}</span>
                            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--error)' }}>Usuń</button>
                        </div>
                    ))}
                    <div style={{ marginTop: 20 }}>
                        <div className="card-header"><span className="card-title"><Key size={16} style={{ marginRight: 8 }} />Limity zapytań</span></div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Próby logowania</span><span style={{ fontWeight: 600 }}>5 / min</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Zapytania API</span><span style={{ fontWeight: 600 }}>100 / min</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Zapytania AI</span><span style={{ fontWeight: 600 }}>20 / min</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
