import { useState } from 'react';
import { Search, FileText, Download, Eye, CheckCircle, XCircle, Edit, History, X, RefreshCw } from 'lucide-react';
import { documents as initialDocuments } from '../data/mockData';
import { useIsMobile } from '../hooks/useMediaQuery';

const statusMap: Record<string, { badge: string; label: string }> = {
    'Szkic': { badge: 'badge-neutral', label: 'Szkic' },
    'Do akceptacji': { badge: 'badge-warning', label: 'Do akceptacji' },
    'Zaakceptowany': { badge: 'badge-success', label: 'Zaakceptowany' },
    'Do poprawy': { badge: 'badge-error', label: 'Do poprawy' },
};

export default function DocumentsPage() {
    const [docs, setDocs] = useState(initialDocuments);
    const [search, setSearch] = useState('');
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [showHistory, setShowHistory] = useState<any>(null);
    const [showReview, setShowReview] = useState<any>(null);
    const isMobile = useIsMobile();

    const filtered = docs.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.caseId.toLowerCase().includes(search.toLowerCase())
    );

    const handleUpdateStatus = (id: string, newStatus: any) => {
        setDocs(docs.map(d => d.id === id ? { ...d, status: newStatus } : d));
        setShowReview(null);
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = (title: string) => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            alert(`Dokument "${title}" został pobrany jako PDF.`);
        }, 1500);
    };

    const renderDocumentCard = (d: any) => {
        const s = statusMap[d.status];
        return (
            <div key={d.id} className="responsive-card">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileText size={16} style={{ color: 'var(--accent-light)' }} />
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{d.title}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{d.caseId} • {d.type}</div>
                        </div>
                    </div>
                    <span className={`badge ${s.badge}`} style={{ fontSize: 10 }}>{s.label}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Autor</div>
                        <div style={{ fontSize: 13 }}>{d.author}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Wersja</div>
                        <button
                            className="badge badge-info"
                            style={{ cursor: 'pointer', border: 'none', fontSize: 11 }}
                            onClick={() => setShowHistory(d)}
                        >
                            v{d.version} <History size={10} style={{ marginLeft: 4 }} />
                        </button>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Ostatnia zmiana</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{d.updatedAt}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedDoc(d)}><Eye size={13} /> Podgląd</button>
                    <button className="btn btn-ghost btn-sm"><Edit size={13} /> Edytuj</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleDownload(d.title)}><Download size={13} /> Pobierz</button>
                    {d.status === 'Do akceptacji' && (
                        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }} onClick={() => setShowReview(d)}>
                            <CheckCircle size={13} /> Recenzja
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Dokumenty</h2><p className="page-header-sub">Menedżer dokumentów z wersjonowaniem i flow akceptacji</p></div>
            </div>
            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj dokumentu..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>

                {isMobile ? (
                    <div className="responsive-cards">
                        {filtered.map(d => renderDocumentCard(d))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>Dokument</th><th>Typ</th><th>Sprawa</th><th>Autor</th><th>Wersja</th><th>Status</th><th>Ostatnia zmiana</th><th>Akcje</th></tr></thead>
                        <tbody>
                            {filtered.map(d => {
                                const s = statusMap[d.status];
                                return (
                                    <tr key={d.id}>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FileText size={16} style={{ color: 'var(--accent-light)' }} /><span style={{ fontWeight: 500 }}>{d.title}</span></div></td>
                                        <td><span className="tag">{d.type}</span></td>
                                        <td style={{ color: 'var(--accent-light)', fontWeight: 500, fontSize: 13 }}>{d.caseId}</td>
                                        <td style={{ fontSize: 13 }}>{d.author}</td>
                                        <td>
                                            <button
                                                className="badge badge-info"
                                                style={{ cursor: 'pointer', border: 'none' }}
                                                onClick={() => setShowHistory(d)}
                                            >
                                                v{d.version} <History size={10} style={{ marginLeft: 4 }} />
                                            </button>
                                        </td>
                                        <td><span className={`badge ${s.badge}`}>{s.label}</span></td>
                                        <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{d.updatedAt}</td>
                                        <td><div style={{ display: 'flex', gap: 4 }}>
                                            <button className="btn btn-ghost btn-sm" title="Podgląd" onClick={() => setSelectedDoc(d)}><Eye size={13} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Edytuj"><Edit size={13} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Pobierz" onClick={() => handleDownload(d.title)}><Download size={13} /></button>
                                            {d.status === 'Do akceptacji' && (
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    title="Recenzja"
                                                    style={{ color: 'var(--accent)' }}
                                                    onClick={() => setShowReview(d)}
                                                >
                                                    <CheckCircle size={13} />
                                                </button>
                                            )}
                                        </div></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Document Preview Modal */}
            {selectedDoc && (
                <div className="modal-overlay">
                    <div className="modal" style={{ maxWidth: 800 }}>
                        <div className="modal-header">
                            <h3 className="modal-title">{selectedDoc.title}</h3>
                            <button className="modal-close" onClick={() => setSelectedDoc(null)}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 40, background: 'var(--bg-primary)', margin: 20, borderRadius: 8, minHeight: 400, border: '1px solid var(--border-secondary)', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: 14, fontFamily: 'serif' }}>
                            {`UMOWA O ŚWIADCZENIE USŁUG PRAWNYCH\n\nZawarta w dniu ${selectedDoc.updatedAt} pomiędzy...\n\n§ 1. Przedmiot umowy...\n\nNiniejsza umowa reguluje zasady współpracy w ramach sprawy ${selectedDoc.caseId}...\n\n[TREŚĆ DOKUMENTU GENEROWANA LUB WCZYTANA Z PLIKU]\n\n...\n\nPodpisano elektronicznie przez: ${selectedDoc.author}`}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedDoc(null)}>Zamknij</button>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleDownload(selectedDoc.title)}
                                disabled={isDownloading}
                            >
                                {isDownloading ? <RefreshCw size={14} className="spin" /> : <Download size={14} />}
                                {isDownloading ? 'Generowanie...' : 'Pobierz PDF'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Version History Modal */}
            {showHistory && (
                <div className="modal-overlay">
                    <div className="modal" style={{ maxWidth: 500 }}>
                        <div className="modal-header">
                            <h3 className="modal-title">Historia wersji: {showHistory.title}</h3>
                            <button className="modal-close" onClick={() => setShowHistory(null)}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[...Array(Number(showHistory.version))].map((_, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border-secondary)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Wersja 1.{Number(showHistory.version) - i}</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{showHistory.updatedAt} • {showHistory.author}</div>
                                        </div>
                                        <button className="btn btn-ghost btn-xs"><Eye size={12} /> Przywróć</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowHistory(null)}>Zamknij</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {showReview && (
                <div className="modal-overlay">
                    <div className="modal" style={{ maxWidth: 500 }}>
                        <div className="modal-header">
                            <h3 className="modal-title">Recenzja dokumentu</h3>
                            <button className="modal-close" onClick={() => setShowReview(null)}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 20 }}>
                            <div className="form-group">
                                <label>Komentarz do decyzji</label>
                                <textarea placeholder="Poinformuj autora o powodzie decyzji..." style={{ minHeight: 100 }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <button className="btn btn-error" style={{ gap: 8 }} onClick={() => handleUpdateStatus(showReview.id, 'Do poprawy')}>
                                    <XCircle size={16} /> Odrzuć / Poprawa
                                </button>
                                <button className="btn btn-success" style={{ gap: 8 }} onClick={() => handleUpdateStatus(showReview.id, 'Zaakceptowany')}>
                                    <CheckCircle size={16} /> Zaakceptuj
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
