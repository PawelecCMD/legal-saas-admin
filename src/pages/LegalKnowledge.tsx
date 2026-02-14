import { useState } from 'react';
import { Search, BookOpen, Scale, FileText } from 'lucide-react';
import { ragKnowledgeEntries } from '../data/ragKnowledge';

const articles = ragKnowledgeEntries;

export default function LegalKnowledgePage() {
    const [search, setSearch] = useState('');
    const [codeFilter, setCodeFilter] = useState('all');
    const filtered = articles.filter(a => {
        const matchSearch = !search || a.art.toLowerCase().includes(search.toLowerCase()) || a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase());
        const matchCode = codeFilter === 'all' || a.code === codeFilter;
        return matchSearch && matchCode;
    });
    const codes = [...new Set(articles.map(a => a.code))];

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Baza prawa i orzecznictwa</h2><p className="page-header-sub">Przeglądarka kodeksów, artykułów i orzecznictwa</p></div>
            </div>
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Kodeksy</span><BookOpen size={16} className="stat-card-icon" /></div><div className="stat-card-value">12</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Artykuły</span><Scale size={16} className="stat-card-icon" /></div><div className="stat-card-value">24,891</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Orzeczenia</span><FileText size={16} className="stat-card-icon" /></div><div className="stat-card-value">156,230</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Embeddingi</span></div><div className="stat-card-value" style={{ color: 'var(--success)' }}>✓ Aktualne</div></div>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder='Szukaj np. "art. 286 kk"...' value={search} onChange={e => setSearch(e.target.value)} /></div>
                    <select value={codeFilter} onChange={e => setCodeFilter(e.target.value)}>
                        <option value="all">Wszystkie kodeksy</option>
                        {codes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                {filtered.map(a => (
                    <div key={a.art} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                            <span className="badge badge-purple">{a.code}</span>
                            <span style={{ fontWeight: 700, color: 'var(--accent-light)' }}>{a.art}</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{a.title}</span>
                        </div>
                        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
