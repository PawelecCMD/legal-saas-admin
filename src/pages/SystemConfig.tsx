import { Save, Globe, Mail, Key, Webhook } from 'lucide-react';

export default function SystemConfigPage() {
    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Konfiguracja systemu</h2><p className="page-header-sub">Ustawienia platformy, SMTP, API, webhooki</p></div>
                <button className="btn btn-primary"><Save size={15} /> Zapisz zmiany</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header"><span className="card-title"><Globe size={16} style={{ marginRight: 8 }} />Ogólne</span></div>
                    <div className="form-group"><label>Nazwa platformy</label><input type="text" defaultValue="Legal SaaS Platform" /></div>
                    <div className="form-group"><label>Domena główna</label><input type="text" defaultValue="app.legalsaas.pl" /></div>
                    <div className="form-group"><label>Środowisko</label><select defaultValue="production"><option value="sandbox">Testowe</option><option value="production">Produkcyjne</option></select></div>
                    <div className="form-group"><label>Logo URL</label><input type="text" defaultValue="/assets/logo.svg" /></div>
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><Mail size={16} style={{ marginRight: 8 }} />SMTP</span></div>
                    <div className="form-group"><label>Serwer SMTP</label><input type="text" defaultValue="smtp.sendgrid.net" /></div>
                    <div className="form-row">
                        <div className="form-group"><label>Port</label><input type="number" defaultValue="587" /></div>
                        <div className="form-group"><label>Szyfrowanie</label><select defaultValue="tls"><option value="tls">TLS</option><option value="ssl">SSL</option><option value="none">Brak</option></select></div>
                    </div>
                    <div className="form-group"><label>Email nadawcy</label><input type="email" defaultValue="noreply@legalsaas.pl" /></div>
                    <div className="form-group"><label>API Key</label><input type="password" defaultValue="SG.xxxxxxxxxxxx" /></div>
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><Key size={16} style={{ marginRight: 8 }} />Klucze API</span></div>
                    {[
                        { name: 'Stripe', key: 'sk_live_••••4242', active: true },
                        { name: 'PayU', key: 'pos_id_••••8899', active: true },
                        { name: 'OpenAI', key: 'sk-••••abcd', active: true },
                        { name: 'KSeF', key: 'ksef_token_••••xyz', active: true },
                    ].map(k => (
                        <div key={k.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-secondary)' }}>
                            <div><div style={{ fontWeight: 500, fontSize: 14 }}>{k.name}</div><div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-tertiary)' }}>{k.key}</div></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className={`badge ${k.active ? 'badge-success' : 'badge-neutral'}`}>{k.active ? 'Aktywny' : 'Nieaktywny'}</span>
                                <button className="btn btn-ghost btn-sm">Edytuj</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><Webhook size={16} style={{ marginRight: 8 }} />Webhooki</span></div>
                    {[
                        { url: 'https://crm.example.com/webhook', events: 'case.created, payment.completed', active: true },
                        { url: 'https://slack.com/webhook/legal', events: 'ticket.created', active: true },
                    ].map((w, i) => (
                        <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-secondary)' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-light)', marginBottom: 4 }}>{w.url}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: 4 }}>{w.events.split(', ').map(e => <span key={e} className="tag">{e}</span>)}</div>
                                <div className={`toggle ${w.active ? 'active' : ''}`}></div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-secondary" style={{ marginTop: 12, width: '100%' }}>+ Dodaj webhook</button>
                </div>
            </div>
        </div>
    );
}
