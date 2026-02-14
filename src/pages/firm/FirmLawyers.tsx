import { Plus, Star, Briefcase } from 'lucide-react';
import { lawyers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const statusBadge: Record<string, string> = { active: 'badge-success', suspended: 'badge-error', verification: 'badge-warning' };
const statusLabel: Record<string, string> = { active: 'Aktywny', suspended: 'Zawieszony', verification: 'Weryfikacja' };

export default function FirmLawyers() {
    const { user } = useAuth();
    const firmLawyers = lawyers.filter(l => l.lawFirm === (user?.firmName || 'Kancelaria Nowak'));

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Prawnicy</h2>
                    <p className="page-header-sub">{firmLawyers.length} prawników w zespole</p>
                </div>
                <button className="btn btn-primary"><Plus size={15} /> Dodaj prawnika</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                {firmLawyers.map(l => (
                    <div key={l.id} className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                <div className="topbar-avatar" style={{ width: 48, height: 48, fontSize: 16, background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                    {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: 15 }}>{l.name}</h4>
                                    <p style={{ margin: 0, fontSize: 12, color: 'var(--text-tertiary)' }}>{l.email}</p>
                                </div>
                            </div>
                            <span className={`badge ${statusBadge[l.status]}`}>{statusLabel[l.status]}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                            {l.specializations.map(s => (
                                <span key={s} className="badge badge-neutral" style={{ fontSize: 11 }}>{s}</span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Briefcase size={13} /> {l.caseCount} spraw
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Star size={13} fill="var(--warning)" color="var(--warning)" /> {l.rating.toFixed(1)}
                            </span>
                            <span>Aktywność: {l.activityScore}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
