import { Globe, FileText, Mail, Star } from 'lucide-react';

export default function CMSPage() {
    return (
        <div className="animate-in">
            <div className="page-header"><div><h2>CMS i marketing</h2><p className="page-header-sub">Landing page builder, SEO, newsletter, opinie</p></div></div>
            <div className="grid-2">
                <div className="card">
                    <div className="card-header"><span className="card-title"><Globe size={16} style={{ marginRight: 8 }} />Landing Page Builder</span><button className="btn btn-secondary btn-sm">Edytuj</button></div>
                    {['Hero', 'Jak to działa', 'Funkcje', 'Dla kancelarii', 'Bezpieczeństwo', 'Opinie', 'Cennik', 'FAQ', 'Footer'].map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border-secondary)', fontSize: 13 }}>
                            <span>Sekcja {i + 1}: {s}</span>
                            <div className={`toggle active`}></div>
                        </div>
                    ))}
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><FileText size={16} style={{ marginRight: 8 }} />SEO</span></div>
                    <div className="form-group"><label>Meta title</label><input type="text" defaultValue="Legal SaaS – Nowoczesna obsługa spraw prawnych" /></div>
                    <div className="form-group"><label>Meta description</label><textarea rows={2} defaultValue="AI + kancelarie + bezpieczne płatności w jednym systemie. Rozpocznij sprawę online." /></div>
                    <div className="form-group"><label>Canonical URL</label><input type="text" defaultValue="https://legalsaas.pl" /></div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                        {['Schema.org ✓', 'Sitemap.xml ✓', 'Robots.txt ✓', 'Open Graph ✓'].map(t => <span key={t} className="badge badge-success">{t}</span>)}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><Mail size={16} style={{ marginRight: 8 }} />Newsletter</span></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Subskrybenci</div><div style={{ fontSize: 22, fontWeight: 700 }}>2,847</div></div>
                        <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Open rate</div><div style={{ fontSize: 22, fontWeight: 700, color: 'var(--success)' }}>34%</div></div>
                        <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Kampanie</div><div style={{ fontSize: 22, fontWeight: 700 }}>12</div></div>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%' }}>Nowa kampania</button>
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title"><Star size={16} style={{ marginRight: 8 }} />Opinie</span><button className="btn btn-secondary btn-sm">Moderacja</button></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                        <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>O platformie</div><div className="rating" style={{ fontSize: 18 }}><Star size={18} /> 4.7</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>128 opinii</div></div>
                        <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>O kancelariach</div><div className="rating" style={{ fontSize: 18 }}><Star size={18} /> 4.5</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>342 opinii</div></div>
                        <div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>O prawnikach</div><div className="rating" style={{ fontSize: 18 }}><Star size={18} /> 4.6</div><div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>521 opinii</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
