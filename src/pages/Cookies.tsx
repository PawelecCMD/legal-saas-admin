import { Cookie, Save } from 'lucide-react';

const categories = [
    { name: 'Niezbędne', desc: 'Wymagane do działania platformy', required: true, enabled: true },
    { name: 'Analityczne', desc: 'Google Analytics, Hotjar', required: false, enabled: true },
    { name: 'Marketingowe', desc: 'Meta Pixel, Google Ads', required: false, enabled: false },
    { name: 'Funkcjonalne', desc: 'Personalizacja, preferencje', required: false, enabled: true },
];

export default function CookiesPage() {
    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Zarządzanie cookies</h2><p className="page-header-sub">Konfiguracja banneru RODO i zgód</p></div>
                <button className="btn btn-primary"><Save size={15} /> Zapisz</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header"><span className="card-title"><Cookie size={16} style={{ marginRight: 8 }} />Kategorie cookies</span></div>
                    {categories.map((c, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < categories.length - 1 ? '1px solid var(--border-secondary)' : 'none' }}>
                            <div><div style={{ fontWeight: 500, fontSize: 14 }}>{c.name} {c.required && <span className="badge badge-neutral" style={{ marginLeft: 6 }}>Wymagane</span>}</div><div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{c.desc}</div></div>
                            <div className={`toggle ${c.enabled ? 'active' : ''}`} style={{ opacity: c.required ? 0.5 : 1, pointerEvents: c.required ? 'none' : 'auto' }}></div>
                        </div>
                    ))}
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title">Konfiguracja banneru</span></div>
                    <div className="form-group"><label>Tryb zgody</label><select defaultValue="detailed"><option value="simple">Akceptuj / Odrzuć</option><option value="detailed">Zarządzaj preferencjami</option></select></div>
                    <div className="form-group"><label>Tekst banneru</label><textarea rows={3} defaultValue="Ta strona używa plików cookies w celu zapewnienia prawidłowego działania..." style={{ resize: 'vertical' }} /></div>
                    <div className="form-group"><label>Kolor przycisku</label><input type="text" defaultValue="#6366f1" /></div>
                    <div className="form-group"><label>Pozycja</label><select defaultValue="bottom"><option value="bottom">Dół strony</option><option value="center">Centrum</option></select></div>
                    <div style={{ marginTop: 20, padding: '16px', background: 'rgba(99,102,241,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-secondary)' }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 4 }}>INTEGRACJE</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <span className="tag">Google Tag Manager</span>
                            <span className="tag">Meta Pixel</span>
                            <span className="tag">Hotjar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
