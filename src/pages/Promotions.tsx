import { promotions } from '../data/mockData';
import { Plus, Percent, Tag } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

export default function PromotionsPage() {
    const isMobile = useIsMobile();

    const renderPromotionCard = (p: any) => (
        <div key={p.id} className="responsive-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag size={14} style={{ color: 'var(--accent-light)' }} />
                    <div>
                        <div style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{p.code}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{p.expiresAt}</div>
                    </div>
                </div>
                <span className={`badge ${p.active ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: 10 }}>{p.active ? 'Aktywna' : 'Nieaktywna'}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Typ</div>
                    <span className="badge badge-purple" style={{ fontSize: 11 }}>{p.type === 'global' ? 'Globalna' : p.type === 'one-time' ? 'Jednorazowa' : p.type === 'per-firm' ? 'Per kancelaria' : 'Wielokrotna'}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Rabat</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}><Percent size={13} />{p.discount}{p.discountType === 'percent' ? '%' : ' zł'}</div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Użycia</div>
                    <div style={{ fontSize: 12, marginBottom: 3 }}>{p.usageCount} / {p.usageLimit}</div>
                    <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${(p.usageCount / p.usageLimit) * 100}%` }}></div></div>
                </div>
            </div>
            <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>Plany</div>
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    {p.assignedPlans.map((ap: string) => <span key={ap} className="tag">{ap}</span>)}
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Promocje</h2><p className="page-header-sub">Zarządzanie kuponami i promocjami</p></div>
                <button className="btn btn-primary"><Plus size={15} /> Nowa promocja</button>
            </div>
            <div className="data-table-wrapper">
                {isMobile ? (
                    <div className="responsive-cards">
                        {promotions.map(p => renderPromotionCard(p))}
                    </div>
                ) : (
                    <table>
                        <thead><tr><th>Kod</th><th>Typ</th><th>Rabat</th><th>Użycia</th><th>Wygaśnięcie</th><th>Plany</th><th>Status</th></tr></thead>
                        <tbody>
                            {promotions.map(p => (
                                <tr key={p.id}>
                                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Tag size={14} style={{ color: 'var(--accent-light)' }} /><span style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: 14 }}>{p.code}</span></div></td>
                                    <td><span className="badge badge-purple">{p.type === 'global' ? 'Globalna' : p.type === 'one-time' ? 'Jednorazowa' : p.type === 'per-firm' ? 'Per kancelaria' : 'Wielokrotna'}</span></td>
                                    <td style={{ fontWeight: 600 }}><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Percent size={13} />{p.discount}{p.discountType === 'percent' ? '%' : ' zł'}</div></td>
                                    <td>
                                        <div style={{ fontSize: 12, marginBottom: 3 }}>{p.usageCount} / {p.usageLimit}</div>
                                        <div className="progress-bar" style={{ width: 80 }}><div className="progress-bar-fill" style={{ width: `${(p.usageCount / p.usageLimit) * 100}%` }}></div></div>
                                    </td>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{p.expiresAt}</td>
                                    <td><div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>{p.assignedPlans.map(ap => <span key={ap} className="tag">{ap}</span>)}</div></td>
                                    <td><span className={`badge ${p.active ? 'badge-success' : 'badge-neutral'}`}>{p.active ? 'Aktywna' : 'Nieaktywna'}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
